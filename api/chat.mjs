// ─────────────────────────────────────────────────────────────────────────
//  api/chat.mjs  ·  Alta Monte Energy  ·  Asistente "Alma"
//  Requiere en Vercel: ANTHROPIC_API_KEY = sk-ant-...  (con saldo)
// ─────────────────────────────────────────────────────────────────────────

// 📚 BASE DE CONOCIMIENTO — edita/expande con la info de tu proyecto.
const CONOCIMIENTO = `
ALTA MONTE ENERGY — iniciativa de energía renovable en Medellín, Colombia.

QUÉ ES: Instala y opera "nodos" de energía distribuida (DER) en barrios de
ladera de Medellín. No es solo poner paneles: es un sistema inteligente que
genera, optimiza y comparte energía en la comunidad.

PILOTO: "La Torre", en la Comuna 8 de Medellín.

TECNOLOGÍA: paneles solares + batería LFP comunitaria; IoT con ESP32, LoRaWAN,
Modbus RS485 y MQTT; gemelo digital (InfluxDB + Grafana); IA predictiva para
pronóstico de demanda, despacho óptimo y detección de fallas; dashboard web y
alertas por WhatsApp a cada hogar.

MODELO DE NEGOCIO: Energía como Servicio (EaaS). La comunidad accede a energía
solar compartida sin costo inicial; se paga por consumo real (kWh), con
transparencia total vía WhatsApp.

BENEFICIOS: menor dependencia de la red, respaldo ante cortes, visibilidad del
consumo de cada familia, y derechos energéticos distribuidos.

INSTALACIÓN: de 6 a 12 semanas según el proyecto. El equipo coordina los
trámites con EPM y la administración local.

ODS: 7 (energía limpia), 10 (reducción de desigualdades), 11 (ciudades
sostenibles), 13 (acción por el clima).

ALIADOS POTENCIALES: EPM, Ruta N, Universidad Nacional (UNAL), UdeA, SIATA.

CONTACTO: altamonteenergy@gmail.com · WhatsApp +57 304 588 6447 · Medellín.

NOTA: el proyecto está en etapa temprana (piloto). Evita dar cifras exactas de
ahorro o generación; si no tienes el dato, dilo y remite al correo.
`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' })

  try {
    const { messages, idioma } = req.body || {}
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Sin mensajes' })
    }

    if (messages.length > 20) {
      return res.status(400).json({ reply: 'Hemos hablado bastante 😊 Para más detalle, escríbenos a altamonteenergy@gmail.com' })
    }

    const last = messages[messages.length - 1]
    if (last?.role === 'user' && (last.content || '').length > 200) {
      return res.status(400).json({ reply: 'Por favor, haz tu pregunta en 200 caracteres o menos 🙏' })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ reply: 'El asistente no está configurado todavía. Escríbenos a altamonteenergy@gmail.com' })
    }

    const lenguaje = idioma === 'en' ? 'English' : 'Spanish'

    const reglas =
      `You are Alma, the friendly virtual assistant for Alta Monte Energy, a community ` +
      `renewable-energy initiative in Medellín, Colombia.\n` +
      `RULES:\n` +
      `- Reply ONLY in ${lenguaje}, regardless of the language of the question.\n` +
      `- Answer ONLY questions about the Alta Monte project. If asked about anything ` +
      `unrelated, politely steer back to the project.\n` +
      `- Be warm, concise and clear (max 3 short paragraphs).\n` +
      `- Respond in plain, natural text, like a real person speaking. Do NOT use markdown, ` +
      `asterisks (*), bullet symbols, hashes (#) or any formatting symbols. Just normal sentences.\n` +
      `- If you don't know something or it's not in the documentation, say so honestly and ` +
      `invite them to email altamonteenergy@gmail.com. Never invent figures.\n`

    const system = [
      { type: 'text', text: reglas },
      { type: 'text', text: `DOCUMENTATION:\n${CONOCIMIENTO}`, cache_control: { type: 'ephemeral' } },
    ]

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 500,
        system,
        messages: messages.map((m) => ({ role: m.role, content: String(m.content || '').slice(0, 200) })),
      }),
    })

    const data = await resp.json()
    if (!resp.ok) {
      console.error('[chat] Anthropic error:', data)
      return res.status(502).json({ reply: 'El asistente no está disponible ahora. Escríbenos a altamonteenergy@gmail.com' })
    }

    const reply = (data.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim() || 'No pude procesar tu pregunta. Escríbenos a altamonteenergy@gmail.com'

    return res.status(200).json({ reply })
  } catch (err) {
    console.error('[chat] Error inesperado:', err)
    return res.status(500).json({ reply: 'Error del servidor. Escríbenos a altamonteenergy@gmail.com' })
  }
}
