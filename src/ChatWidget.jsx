import React, { useState, useRef, useEffect } from 'react'

// ⬇️ Misma URL de Apps Script que usas en ContactPage (para registrar leads del chat)
const SHEETS_URL = https://script.google.com/macros/s/AKfycbwdyl-d3vLLS_eSedBAFKTM9ey1m5dEYzXAgw3h42zKCQ_zHIe-dCv4EkvN5n_yWAraYg/exec

const MAX_CHARS = 200

const T = {
  es: {
    title: 'Asistente Alta Monte',
    status: 'en línea',
    pick: 'Elige tu idioma para empezar:',
    greet: '¡Hola! 🌿 Soy el asistente de Alta Monte Energy. Pregúntame sobre nuestros nodos energéticos, la tecnología o cómo participar.',
    placeholder: 'Escribe tu pregunta…',
    leadBtn: 'Quiero que me contacten',
    leadName: 'Tu nombre',
    leadContact: 'Correo o WhatsApp',
    leadSend: 'Enviar mis datos',
    leadOk: '✓ ¡Listo! Te contactaremos pronto.',
    errConn: 'Tengo problemas de conexión. Escríbenos a altamonteenergy@gmail.com 🌿',
    suggestions: ['¿Cómo funciona un nodo?', '¿Cómo participo?', '¿Qué tecnología usan?'],
  },
  en: {
    title: 'Alta Monte Assistant',
    status: 'online',
    pick: 'Choose your language to start:',
    greet: 'Hi! 🌿 I\'m the Alta Monte Energy assistant. Ask me about our energy nodes, the technology, or how to get involved.',
    placeholder: 'Type your question…',
    leadBtn: 'I\'d like to be contacted',
    leadName: 'Your name',
    leadContact: 'Email or WhatsApp',
    leadSend: 'Send my info',
    leadOk: '✓ Done! We\'ll reach out soon.',
    errConn: 'I\'m having connection issues. Write to us at altamonteenergy@gmail.com 🌿',
    suggestions: ['How does a node work?', 'How do I join?', 'What tech do you use?'],
  },
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState(null) // null | 'es' | 'en'
  const [messages, setMessages] = useState([]) // {role:'user'|'assistant', content}
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showLead, setShowLead] = useState(false)
  const [lead, setLead] = useState({ nombre: '', contacto: '' })
  const [leadSent, setLeadSent] = useState(false)
  const scrollRef = useRef(null)

  const t = T[lang || 'es']

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, loading, open, lang])

  const send = async (text) => {
    const q = (text ?? input).trim()
    if (!q || loading) return
    const next = [...messages, { role: 'user', content: q.slice(0, MAX_CHARS) }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, idioma: lang }),
      })
      const data = await r.json()
      const reply = data.reply || t.errConn
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: t.errConn }])
    } finally {
      setLoading(false)
    }
  }

  const enviarLead = async () => {
    if (!lead.nombre || !lead.contacto) return
    try {
      await fetch(SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          nombre: lead.nombre,
          email: lead.contacto,
          telefono: '',
          asunto: 'Lead desde chat',
          origen: 'Chat',
          mensaje: 'Solicitó contacto desde el chatbot',
        }),
      })
      setLeadSent(true)
      setTimeout(() => { setShowLead(false); setLeadSent(false); setLead({ nombre: '', contacto: '' }) }, 3000)
    } catch {
      setLeadSent(true) // no-cors: asumimos éxito
    }
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir asistente"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
          width: 60, height: 60, borderRadius: '50%',
          background: '#0B3D2E', border: '2px solid #1ABC9C',
          boxShadow: '0 8px 24px rgba(11,61,46,.35)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {/* Barranquero estilizado */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="11" r="5" fill="#1ABC9C" />
          <path d="M5 24c0-5 4-9 9-9s9 4 9 9" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" />
          <circle cx="20" cy="8" r="3.5" fill="#F4D03F" />
        </svg>
      </button>

      {/* Ventana de chat */}
      {open && (
        <div
          style={{
            position: 'fixed', bottom: 96, right: 24, zIndex: 1000,
            width: 'min(370px, calc(100vw - 32px))',
            background: '#fff', borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(11,61,46,.25)',
            border: '1px solid rgba(11,61,46,.08)',
            display: 'flex', flexDirection: 'column', maxHeight: '70vh',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {/* Header */}
          <div style={{ background: '#0B3D2E', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(26,188,156,.18)', border: '1px solid rgba(26,188,156,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🐦</div>
              <div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>{t.title}</div>
                <div style={{ color: '#2ECC71', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#2ECC71', display: 'inline-block' }} />
                  {t.status}
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.6)', fontSize: 18, cursor: 'pointer' }}>✕</button>
          </div>

          {/* Selector de idioma */}
          {!lang ? (
            <div style={{ padding: 24, textAlign: 'center', background: '#fafafa' }}>
              <p style={{ color: '#0B3D2E', fontSize: 14, marginBottom: 16 }}>🌐 {T.es.pick}<br />{T.en.pick}</p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button onClick={() => setLang('es')} style={btnStyle}>Español</button>
                <button onClick={() => setLang('en')} style={btnStyle}>English</button>
              </div>
            </div>
          ) : (
            <>
              {/* Mensajes */}
              <div ref={scrollRef} style={{ flex: 1, padding: 16, overflowY: 'auto', background: '#fafafa', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Bubble role="assistant">{t.greet}</Bubble>
                {messages.map((m, i) => <Bubble key={i} role={m.role}>{m.content}</Bubble>)}
                {loading && <Bubble role="assistant"><span style={{ opacity: .5 }}>···</span></Bubble>}

                {/* Captura de lead */}
                {!showLead ? (
                  <button onClick={() => setShowLead(true)} style={{ alignSelf: 'flex-start', fontSize: 12, color: '#0B3D2E', background: '#fff', border: '1px solid rgba(11,61,46,.15)', borderRadius: 16, padding: '5px 12px', cursor: 'pointer' }}>
                    📇 {t.leadBtn}
                  </button>
                ) : leadSent ? (
                  <div style={{ alignSelf: 'flex-start', fontSize: 13, color: '#0B3D2E', background: '#f0fdf4', border: '1px solid #2ECC71', borderRadius: 10, padding: '8px 12px' }}>{t.leadOk}</div>
                ) : (
                  <div style={{ background: '#fff', border: '1px solid rgba(11,61,46,.12)', borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <input value={lead.nombre} onChange={(e) => setLead({ ...lead, nombre: e.target.value })} placeholder={t.leadName} style={leadInput} />
                    <input value={lead.contacto} onChange={(e) => setLead({ ...lead, contacto: e.target.value })} placeholder={t.leadContact} style={leadInput} />
                    <button onClick={enviarLead} style={{ ...btnStyle, padding: '8px 14px' }}>{t.leadSend}</button>
                  </div>
                )}
              </div>

              {/* Sugerencias */}
              {messages.length === 0 && (
                <div style={{ padding: '8px 14px', display: 'flex', gap: 6, flexWrap: 'wrap', borderTop: '1px solid rgba(11,61,46,.06)', background: '#fff' }}>
                  {t.suggestions.map((s, i) => (
                    <button key={i} onClick={() => send(s)} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 12, cursor: 'pointer', background: '#F7F4EF', border: '1px solid rgba(11,61,46,.1)', color: '#0B3D2E' }}>{s}</button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div style={{ padding: 12, borderTop: '1px solid rgba(11,61,46,.08)', background: '#fff' }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    value={input}
                    maxLength={MAX_CHARS}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') send() }}
                    placeholder={t.placeholder}
                    style={{ flex: 1, padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(11,61,46,.15)', fontSize: 13, outline: 'none', background: '#F7F4EF' }}
                  />
                  <button onClick={() => send()} disabled={loading} style={{ ...btnStyle, width: 40, padding: 0, opacity: loading ? .6 : 1 }}>➤</button>
                </div>
                <div style={{ textAlign: 'right', fontSize: 10, color: '#9aa89e', marginTop: 4 }}>{input.length}/{MAX_CHARS}</div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

function Bubble({ role, children }) {
  const isUser = role === 'user'
  return (
    <div style={{ alignSelf: isUser ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
      <div style={{
        padding: '10px 13px', fontSize: 13, lineHeight: 1.5,
        background: isUser ? '#0B3D2E' : '#fff',
        color: isUser ? '#fff' : '#0B3D2E',
        border: isUser ? 'none' : '1px solid rgba(11,61,46,.1)',
        borderRadius: isUser ? '12px 4px 12px 12px' : '4px 12px 12px 12px',
        whiteSpace: 'pre-wrap',
      }}>{children}</div>
    </div>
  )
}

const btnStyle = {
  background: '#2ECC71', color: '#0B3D2E', border: 'none',
  borderRadius: 8, padding: '9px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer',
}
const leadInput = {
  padding: '8px 10px', borderRadius: 6, border: '1px solid rgba(11,61,46,.15)', fontSize: 13, outline: 'none',
}
