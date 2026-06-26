// api/chat.mjs · VERSIÓN DE DIAGNÓSTICO (temporal)
// Muestra el error real en el chat para poder identificarlo.

const CONOCIMIENTO = `
ALTA MONTE ENERGY — energía renovable comunitaria en Medellín, Colombia.
Instala "nodos" de energía distribuida (DER) en barrios de ladera. Piloto: La
Torre, Comuna 8. Tecnología: paneles + batería LFP + IoT (ESP32/LoRaWAN) +
gemelo digital + IA. Modelo: Energía como Servicio (EaaS), pago por kWh.
Contacto: altamonteenergy@gmail.com · WhatsApp +57 304 588 6447.
`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' })

  try {
    const { messages, idioma } = req.body || {}
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(200).json({ reply: 'DEBUG: no llegaron mensajes' })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(200).json({ reply: 'DEBUG: falta ANTHROPIC_API_KEY en Vercel' })
    }

    const lenguaje = idioma === 'en' ? 'English' : 'Spanish'

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
        system: [
          { type: 'text', text: `You are Alma, assistant for Alta Monte Energy. Reply only in ${lenguaje}, in plain natural text, no markdown or asterisks. Only answer about the project; if unsure, send them to altamonteenergy@gmail.com.` },
          { type: 'text', text: `DOCUMENTATION:\n${CONOCIMIENTO}` },
        ],
        messages: messages.map((m) => ({ role: m.role, content: String(m.content || '').slice(0, 200) })),
      }),
    })

    const data = await resp.json()

    // 👇 Si Anthropic rechaza, muestra el error EXACTO en el chat
    if (!resp.ok) {
      return res.status(200).json({ reply: `DEBUG (HTTP ${resp.status}): ${JSON.stringify(data?.error || data)}` })
    }

    const reply = (data.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim() || 'DEBUG: respuesta vacía'

    return res.status(200).json({ reply })
  } catch (err) {
    return res.status(200).json({ reply: `DEBUG (excepción): ${err?.message || String(err)}` })
  }
}

