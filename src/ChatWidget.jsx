import React, { useState, useRef, useEffect } from 'react'
import { Send, X, MessageCircle, UserPlus, Phone } from 'lucide-react'

/* ════════════════════════════════════════════════════════════
   CONFIGURACIÓN — edita solo esta sección
   ════════════════════════════════════════════════════════════ */

// 📸 FOTO DE ALMA: sube tu imagen a  public/AM_Imagenes/Alma.png
//    (nombre exacto). Si no existe, se muestra un círculo "A" de marca.
const ALMA_AVATAR = '/AM_Imagenes/barranquero.png'

// 📋 CAPTURA DE LEADS: pega aquí la MISMA URL de Apps Script que ya usa
//    tu formulario de contacto (la de Google Sheets). Si la dejas vacía,
//    el mini-formulario del chat se oculta solo.
const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwdyl-d3vLLS_eSedBAFKTM9ey1m5dEYzXAgw3h42zKCQ_zHIe-dCv4EkvN5n_yWAraYg/exec'

const MAX_CHARS = 500

/* ════════════════════════════════════════════════════════════ */

function limpiarTexto(t) {
  return String(t || '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*•]\s+/gm, '• ')
    .replace(/`{1,3}/g, '')
    .trim()
}

const TXT = {
  es: {
    title: 'Alma',
    subtitle: 'Asistente Virtual',
    hello: '¡Hola! Soy Alma 🌿 Puedo contarte cómo funciona Alta Monte: el valor para empresas con metas ESG, y los beneficios para las comunidades. ¿Qué te gustaría saber?',
    placeholder: 'Escribe tu pregunta…',
    send: 'Enviar',
    leadBtn: 'Quiero que me contacten',
    leadTitle: 'Déjanos tus datos',
    leadName: 'Nombre',
    leadEmail: 'Correo',
    leadOrg: 'Empresa o barrio (opcional)',
    leadInteres: 'Tipo de interés…',
    intereses: ['Patrocinio / RSE-ESG', 'Nodo para mi comunidad', 'Alianza institucional', 'Inversión', 'Otro'],
    leadSend: 'Enviar datos',
    leadOk: '¡Gracias! Te contactaremos en menos de 24 horas.',
    errConn: 'No pude conectarme ahora mismo. Escríbenos por WhatsApp al +57 304 588 6447 y te atendemos de inmediato 🌿',
    typing: 'Alma está escribiendo…'
  },
  en: {
    title: 'Alma',
    subtitle: 'Virtual assistant',
    hello: "Hi! I'm Alma 🌿 I can tell you how Alta Monte works: our energy-as-a-service model, the value for companies with ESG goals, and the benefits for communities. What would you like to know?",
    placeholder: 'Type your question…',
    send: 'Send',
    leadBtn: 'Contact me',
    leadTitle: 'Leave your details',
    leadName: 'Name',
    leadEmail: 'Email',
    leadOrg: 'Company or neighborhood (optional)',
    leadInteres: 'Type of interest…',
    intereses: ['Sponsorship / ESG-CSR', 'Node for my community', 'Institutional alliance', 'Investment', 'Other'],
    leadSend: 'Submit',
    leadOk: "Thanks! We'll reach out within 24 hours.",
    errConn: "Could not connect right now. Message us on WhatsApp +57 304 588 6447 and we will help you right away 🌿",
    typing: 'Alma is typing…'
  }
}

/* Avatar circular de Alma con respaldo automático */
const AlmaAvatar = ({ size = 40 }) => {
  const [fail, setFail] = useState(false)
  if (fail) {
    return (
      <div
        className="rounded-full flex items-center justify-center flex-shrink-0 border-2 border-[#2ecc71]/60"
        style={{ width: size, height: size, background: 'linear-gradient(135deg,#0B3D2E,#1ABC9C)' }}
      >
        <span className="text-white font-bold" style={{ fontSize: size * 0.42 }}>A</span>
      </div>
    )
  }
  return (
    <div
      className="rounded-full overflow-hidden flex-shrink-0 border-2 border-[#2ecc71]/60 bg-[#0B3D2E]"
      style={{ width: size, height: size }}
    >
      <img
        src={ALMA_AVATAR}
        alt="Alma — asistente de Alta Monte Energy"
        className="w-full h-full object-cover"
        onError={() => setFail(true)}
      />
    </div>
  )
}

const ChatWidget = () => {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState('es')
  const t = TXT[lang]

  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const [showLead, setShowLead] = useState(false)
  const [leadName, setLeadName] = useState('')
  const [leadEmail, setLeadEmail] = useState('')
  const [leadOrg, setLeadOrg] = useState('')
  const [leadInteres, setLeadInteres] = useState('')
  const [leadSent, setLeadSent] = useState(false)

  const endRef = useRef(null)
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, loading, showLead])

  useEffect(() => {
    if (open && msgs.length === 0) setMsgs([{ role: 'assistant', content: t.hello }])
  }, [open]) // eslint-disable-line

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    const next = [...msgs, { role: 'user', content: text }]
    setMsgs(next)
    setInput('')
    setLoading(true)
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next })
      })
      const data = await r.json()
      const reply = limpiarTexto(data.reply) || t.errConn
      setMsgs((m) => [...m, { role: 'assistant', content: reply }])
    } catch {
      setMsgs((m) => [...m, { role: 'assistant', content: t.errConn }])
    } finally {
      setLoading(false)
    }
  }

  const sendLead = async () => {
    if (!leadName.trim() || !leadEmail.includes('@') || !SHEETS_URL) return
    try {
      await fetch(SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ nombre: leadName.trim(), email: leadEmail.trim(), empresa: leadOrg.trim(), interes: leadInteres, origen: 'Chat Alma' })
      })
    } catch { /* no-cors: la escritura llega igual */ }
    setLeadSent(true)
    setShowLead(false)
    setMsgs((m) => [...m, { role: 'assistant', content: t.leadOk }])
  }

  return (
    <>
      {/* Botón flotante con la foto de Alma */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir chat con Alma"
          className="fixed bottom-6 right-6 z-50 rounded-full shadow-[0_8px_28px_rgba(11,61,46,.45)] hover:scale-105 transition-transform"
        >
          <AlmaAvatar size={58} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2ecc71] border-2 border-white rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Ventana del chat */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] max-w-[380px] h-[560px] max-h-[80vh] bg-white dark:bg-[#0e241b] rounded-2xl shadow-[0_20px_60px_rgba(6,30,20,.45)] border border-[#2ecc71]/25 flex flex-col overflow-hidden">

          {/* Encabezado */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#0B3D2E] border-b border-[#2ecc71]/20">
            <AlmaAvatar size={40} />
            <div className="flex-grow min-w-0">
              <div className="text-white font-bold leading-tight">{t.title}</div>
              <div className="text-[#A3E4A9] text-[11px] leading-tight truncate">{t.subtitle}</div>
            </div>
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="text-white/70 hover:text-[#F4D03F] text-xs font-bold px-2 py-1 rounded border border-white/15"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <button onClick={() => setOpen(false)} aria-label="Cerrar" className="text-white/70 hover:text-white p-1">
              <X size={18} />
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-grow overflow-y-auto px-3 py-4 space-y-3 bg-[#F7F4EF] dark:bg-[#081b14]">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && <AlmaAvatar size={28} />}
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-[#2ECC71] text-[#0B3D2E] rounded-br-md'
                      : 'bg-white dark:bg-[#0e241b] text-[#2C2C2C] dark:text-[#e6ede9] border border-[#2ecc71]/20 rounded-bl-md'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center">
                <AlmaAvatar size={28} />
                <div className="bg-white dark:bg-[#0e241b] border border-[#2ecc71]/20 px-3.5 py-2.5 rounded-2xl rounded-bl-md text-xs text-[#5a7a6a] dark:text-[#9fb8ac]">
                  {t.typing}
                </div>
              </div>
            )}

            {/* Mini-formulario de contacto */}
            {showLead && !leadSent && (
              <div className="bg-white dark:bg-[#0e241b] border border-[#2ecc71]/30 rounded-xl p-3 space-y-2">
                <div className="text-xs font-bold text-[#0B3D2E] dark:text-[#e9f5ef]">{t.leadTitle}</div>
                <input
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder={t.leadName}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-[#2ecc71]/30 bg-[#F7F4EF] dark:bg-[#081b14] dark:text-[#e6ede9] outline-none focus:border-[#2ecc71]"
                />
                <input
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder={t.leadEmail}
                  type="email"
                  className="w-full text-sm px-3 py-2 rounded-lg border border-[#2ecc71]/30 bg-[#F7F4EF] dark:bg-[#081b14] dark:text-[#e6ede9] outline-none focus:border-[#2ecc71]"
                />
                <input
                  value={leadOrg}
                  onChange={(e) => setLeadOrg(e.target.value)}
                  placeholder={t.leadOrg}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-[#2ecc71]/30 bg-[#F7F4EF] dark:bg-[#081b14] dark:text-[#e6ede9] outline-none focus:border-[#2ecc71]"
                />
                <select
                  value={leadInteres}
                  onChange={(e) => setLeadInteres(e.target.value)}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-[#2ecc71]/30 bg-[#F7F4EF] dark:bg-[#081b14] dark:text-[#e6ede9] outline-none focus:border-[#2ecc71]"
                >
                  <option value="">{t.leadInteres}</option>
                  {t.intereses.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <button
                  onClick={sendLead}
                  className="w-full bg-[#2ECC71] text-[#0B3D2E] font-bold text-sm py-2 rounded-lg hover:bg-[#F4D03F] transition-colors"
                >
                  {t.leadSend}
                </button>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Barra de acciones + entrada */}
          <div className="border-t border-[#2ecc71]/20 bg-white dark:bg-[#0e241b] p-3 space-y-2">
            <a
              href="https://wa.me/573045886447"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] font-bold text-[#0B3D2E] dark:text-[#A3E4A9] hover:text-[#2ECC71] transition-colors"
            >
              <Phone size={13} /> WhatsApp directo
            </a>
            {SHEETS_URL && !leadSent && !showLead && (
              <button
                onClick={() => setShowLead(true)}
                className="flex items-center gap-1.5 text-[11px] font-bold text-[#0B3D2E] dark:text-[#A3E4A9] hover:text-[#2ECC71] transition-colors"
              >
                <UserPlus size={13} /> {t.leadBtn}
              </button>
            )}
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
                placeholder={t.placeholder}
                className="flex-grow text-sm px-3.5 py-2.5 rounded-xl border border-[#2ecc71]/30 bg-[#F7F4EF] dark:bg-[#081b14] dark:text-[#e6ede9] outline-none focus:border-[#2ecc71]"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label={t.send}
                className="w-11 h-11 rounded-xl bg-[#2ECC71] text-[#0B3D2E] flex items-center justify-center hover:bg-[#F4D03F] disabled:opacity-40 transition-colors flex-shrink-0"
              >
                <Send size={17} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatWidget
