// ─────────────────────────────────────────────────────────────────────────
//  api/contacto.js  ·  Alta Monte Energy
//  Función serverless de Vercel. Recibe el formulario de contacto y, en una
//  sola petición, sin abrir el cliente de correo del visitante:
//    1. Verifica antispam (honeypot + Cloudflare Turnstile)
//    2. Envía el correo al equipo (Resend)
//    3. Envía respuesta automática al visitante (Resend)
//    4. Registra el lead en Google Sheets (vía webhook de Apps Script)
//    5. Notifica por WhatsApp (CallMeBot — módulo intercambiable)
//
//  El mismo endpoint sirve para el formulario Y para los leads que capture
//  el chat: basta con enviar { origen: 'Chat' } en el cuerpo.
//
//  Todas las integraciones son OPCIONALES: si falta una variable de entorno,
//  ese paso se omite sin tumbar el resto. Configúralas en Vercel → Settings →
//  Environment Variables (ver SETUP más abajo en el chat).
// ─────────────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const {
      nombre,
      email,
      telefono,
      tipo,
      mensaje,
      website,        // honeypot: campo oculto; si viene lleno, es un bot
      turnstileToken, // token del captcha invisible de Cloudflare
      origen,         // 'Formulario web' (por defecto) o 'Chat'
    } = req.body || {};

    // 1a. Honeypot — un humano nunca llena este campo. Fingimos éxito para
    //     no darle pistas al bot.
    if (website) {
      return res.status(200).json({ ok: true });
    }

    // Validación mínima
    if (!nombre || !email) {
      return res.status(400).json({ error: 'Nombre y correo son obligatorios.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Correo no válido.' });
    }
    if ((mensaje || '').length > 2000) {
      return res.status(400).json({ error: 'El mensaje es demasiado largo.' });
    }

    // 1b. Verificación antispam (Turnstile)
    const captchaOk = await verificarTurnstile(turnstileToken, req);
    if (!captchaOk) {
      return res.status(400).json({ error: 'Verificación antispam fallida. Recarga e inténtalo de nuevo.' });
    }

    const lead = {
      nombre: String(nombre).slice(0, 120),
      email: String(email).slice(0, 160),
      telefono: String(telefono || '').slice(0, 40),
      tipo: String(tipo || 'General').slice(0, 80),
      mensaje: String(mensaje || '').slice(0, 2000),
      origen: String(origen || 'Formulario web').slice(0, 40),
      fecha: new Date().toISOString(),
    };

    // 2–5. Ejecutamos todo en paralelo. Usamos allSettled para que el fallo
    //      de un canal (p. ej. WhatsApp) no impida los demás.
    const resultados = await Promise.allSettled([
      enviarCorreoEquipo(lead),
      enviarRespuestaAutomatica(lead),
      registrarEnSheet(lead),
      notificarWhatsApp(lead),
    ]);

    // Dejamos rastro de cualquier fallo parcial en los logs de Vercel.
    const pasos = ['correo-equipo', 'auto-respuesta', 'google-sheets', 'whatsapp'];
    resultados.forEach((r, i) => {
      if (r.status === 'rejected') console.error(`[contacto] Falló ${pasos[i]}:`, r.reason);
    });

    // Mientras al menos el correo al equipo o el registro hayan funcionado,
    // consideramos el envío exitoso para el visitante.
    const correoOk = resultados[0].status === 'fulfilled';
    const sheetOk = resultados[2].status === 'fulfilled';
    if (!correoOk && !sheetOk) {
      return res.status(502).json({ error: 'No pudimos registrar tu mensaje. Escríbenos a altamonteenergy@gmail.com' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[contacto] Error inesperado:', err);
    return res.status(500).json({ error: 'Error del servidor. Escríbenos a altamonteenergy@gmail.com' });
  }
}

// ── Antispam ───────────────────────────────────────────────────────────────
async function verificarTurnstile(token, req) {
  // Si no hay secret configurado, no bloqueamos (cómodo en desarrollo).
  if (!process.env.TURNSTILE_SECRET) return true;
  if (!token) return false;

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET,
      response: token,
      ...(ip ? { remoteip: ip } : {}),
    }),
  });
  const data = await resp.json().catch(() => ({}));
  return Boolean(data.success);
}

// ── Correo (Resend) ──────────────────────────────────────────────────────────
async function resendSend({ to, subject, html, replyTo }) {
  if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY no configurada');
  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || 'Alta Monte Energy <onboarding@resend.dev>',
      to: [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  if (!resp.ok) throw new Error('Resend: ' + (await resp.text()));
  return resp.json();
}

function enviarCorreoEquipo(lead) {
  const fila = (k, v) =>
    `<tr><td style="padding:6px 12px;color:#5a7a6a;font:13px/1.4 Arial">${k}</td>` +
    `<td style="padding:6px 12px;color:#0B3D2E;font:13px/1.4 Arial"><b>${escapar(v) || '—'}</b></td></tr>`;
  const html = `
    <div style="max-width:560px;margin:auto;border:1px solid #e6e6e6;border-radius:12px;overflow:hidden">
      <div style="background:#0B3D2E;color:#fff;padding:18px 20px;font:600 15px Arial">
        🌿 Nuevo contacto · Alta Monte Energy
      </div>
      <table style="width:100%;border-collapse:collapse">
        ${fila('Nombre', lead.nombre)}
        ${fila('Correo', lead.email)}
        ${fila('Teléfono', lead.telefono)}
        ${fila('Tipo', lead.tipo)}
        ${fila('Origen', lead.origen)}
        <tr><td colspan="2" style="padding:12px;color:#5a7a6a;font:13px Arial">Mensaje:</td></tr>
        <tr><td colspan="2" style="padding:0 12px 16px;color:#0B3D2E;font:14px/1.6 Arial">${escapar(lead.mensaje) || '—'}</td></tr>
      </table>
    </div>`;
  return resendSend({
    to: process.env.CONTACT_TO || 'altamonteenergy@gmail.com',
    replyTo: lead.email, // respondes directo desde tu bandeja
    subject: `Nuevo contacto (${lead.tipo}) — ${lead.nombre}`,
    html,
  });
}

function enviarRespuestaAutomatica(lead) {
  const html = `
    <div style="max-width:520px;margin:auto;font:15px/1.7 Arial;color:#0B3D2E">
      <p>Hola ${escapar(lead.nombre.split(' ')[0])},</p>
      <p>¡Gracias por escribirnos! Recibimos tu mensaje y nuestro equipo te
      responderá en <b>menos de 24 horas</b>.</p>
      <p>Mientras tanto, si es urgente puedes escribirnos por WhatsApp al
      <a href="https://wa.me/573045886447" style="color:#2ECC71">+57 304 588 6447</a>.</p>
      <p style="margin-top:24px;color:#5a7a6a;font-size:13px">
        — Equipo Alta Monte Energy 🌿<br>
        <i>Energía que nace de la naturaleza, impulsada por la inteligencia.</i>
      </p>
    </div>`;
  return resendSend({
    to: lead.email,
    subject: 'Recibimos tu mensaje — Alta Monte Energy',
    html,
  });
}

// ── Registro en Google Sheets (webhook de Apps Script) ───────────────────────
async function registrarEnSheet(lead) {
  if (!process.env.SHEETS_WEBHOOK_URL) return; // opcional
  const resp = await fetch(process.env.SHEETS_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });
  if (!resp.ok) throw new Error('Sheets webhook: ' + resp.status);
}

// ── WhatsApp (CallMeBot) · MÓDULO INTERCAMBIABLE ─────────────────────────────
// Para migrar a la Meta Cloud API oficial en el futuro, basta con reemplazar
// el cuerpo de esta función — el resto del archivo no cambia.
async function notificarWhatsApp(lead) {
  if (!process.env.WHATSAPP_PHONE || !process.env.CALLMEBOT_APIKEY) return; // opcional
  const texto =
    `🌿 Nuevo contacto Alta Monte\n` +
    `Nombre: ${lead.nombre}\n` +
    `Correo: ${lead.email}\n` +
    `Tel: ${lead.telefono || '—'}\n` +
    `Tipo: ${lead.tipo}\n` +
    `Origen: ${lead.origen}\n` +
    `Mensaje: ${(lead.mensaje || '—').slice(0, 300)}`;
  const url =
    `https://api.callmebot.com/whatsapp.php` +
    `?phone=${encodeURIComponent(process.env.WHATSAPP_PHONE)}` +
    `&text=${encodeURIComponent(texto)}` +
    `&apikey=${encodeURIComponent(process.env.CALLMEBOT_APIKEY)}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('CallMeBot: ' + resp.status);
}

// ── Utilidad ─────────────────────────────────────────────────────────────────
function escapar(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
