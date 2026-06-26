// ─────────────────────────────────────────────────────────────────────────
//  api/chat.mjs  ·  Alta Monte Energy  ·  Asistente "Alma"
//  Respuestas cortas (≤200 caracteres) para minimizar el uso de tokens.
//  Requiere en Vercel: ANTHROPIC_API_KEY = sk-ant-...
// ─────────────────────────────────────────────────────────────────────────

const CONOCIMIENTO = `
ALTA MONTE ENERGY — iniciativa de energía renovable en Medellín, Colombia.
Instala "nodos" de energía distribuida (DER) en barrios de ladera. No es solo
poner paneles: genera, optimiza y comparte energía en la comunidad.
PILOTO: La Torre, Comuna 8.
TECNOLOGÍA: paneles + batería LFP comunitaria; IoT (ESP32, LoRaWAN, MQTT);
gemelo digital (InfluxDB/Grafana); IA predictiva; dashboard y alertas WhatsApp.
MODELO: Energía como Servicio (EaaS), sin costo inicial, pago por kWh.
BENEFICIOS: menos dependencia de la red, respaldo en cortes, consumo visible.
INSTALACIÓN: 6 a 12 semanas; coordinan trámites con EPM.
ODS: 7, 10, 11, 13. ALIADOS: EPM, Ruta N, UNAL, UdeA, SIATA.
CONTACTO: altamonteenergy@gmail.com · WhatsApp +57 304 588 6447 · Medellín.
NOTA: etapa temprana (piloto). No des cifras exactas de ahorro o generación.
`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' })

  try {
    const { messages, idioma } = req.body || {}
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Sin mensajes' })
    }

    if (messages.length > 20) {
      return res.status(400).json({ reply: 'Hemos hablado bastante 😊 Escríbenos a altamonteenergy@gmail.com' })
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
      `You are Alma, the friendly assistant for Alta Monte Energy, a community ` +
      `renewable-energy initiative in Medellín, Colombia.\n` +
      `RULES:\n` +
      `- Reply ONLY in ${lenguaje}.\n` +
      `- VERY IMPORTANT: answer in 200 characters or fewer. One or two short, warm sentences. Be brief.\n` +
      `- Answer ONLY about the Alta Monte project; if it's unrelated, steer back politely.\n` +
      `- Plain natural text, like a real person. NO markdown, asterisks, bullets or # symbols.\n` +
      `- If you don't know, say so briefly and invite them to email altamonteenergy@gmail.com. Never invent figures.\n`

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
        max_tokens: 120, // tope bajo = menos tokens por respuesta
        system,
        messages: messages.map((m) => ({ role: m.role, content: String(m.content || '').slice(0, 200) })),
      }),
    })

    const data = await resp.json()
    if (!resp.ok) {
      console.error('[chat] Anthropic error:', data)
      return res.status(502).json({ reply: 'El asistente no está disponible ahora. Escríbenos a altamonteenergy@gmail.com' })
    }

    let reply = (data.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join(' ')
      .trim() || 'Escríbenos a altamonteenergy@gmail.com'

    // Recorte de seguridad a 200 caracteres (en límite de palabra)
    if (reply.length > 200) {
      reply = reply.slice(0, 200)
      const sp = reply.lastIndexOf(' ')
      if (sp > 150) reply = reply.slice(0, sp)
      reply = reply.trim() + '…'
    }

    return res.status(200).json({ reply })
  } catch (err) {
    console.error('[chat] Error inesperado:', err)
    return res.status(500).json({ reply: 'Error del servidor. Escríbenos a altamonteenergy@gmail.com' })
  }
}
