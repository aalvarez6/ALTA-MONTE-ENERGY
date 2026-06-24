import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react'

// ⬇️ Pega aquí la URL de tu App Web de Apps Script (la que registra en el Sheet)
const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwdyl-d3vLLS_eSedBAFKTM9ey1m5dEYzXAgw3h42zKCQ_zHIe-dCv4EkvN5n_yWAraYg/exec'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
    website: '', // honeypot antispam: invisible para humanos
  })
  // idle | enviando | ok | error
  const [estado, setEstado] = useState('idle')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      alert('Por favor completa los campos requeridos')
      return
    }
    if (formData.website) {
      // Bot detectado: fingimos éxito y no registramos nada
      setEstado('ok')
      return
    }

    setEstado('enviando')
    try {
      // no-cors + text/plain → evita el bloqueo CORS de Apps Script.
      // La fila se escribe en el Sheet; asumimos éxito si no hay error de red.
      await fetch(SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          asunto: formData.asunto || 'Consulta',
          origen: 'Formulario web',
          mensaje: formData.mensaje,
        }),
      })
      setEstado('ok')
      setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '', website: '' })
      setTimeout(() => setEstado('idle'), 6000)
    } catch {
      setEstado('error')
    }
  }

  const enviando = estado === 'enviando'

  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-[#2ecc71] hover:text-[#f4d03f] transition-colors mb-8 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <div className="mb-16">
          <h1 className="text-5xl font-bold text-[#0b3d2e] mb-4">Contacto</h1>
          <p className="text-xl text-[#5a7a6a] max-w-3xl">
            Cuéntanos sobre tu comunidad, tu barrio o tu idea. Respondemos en menos de 24 horas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-[#F7F4EF] to-white rounded-2xl p-8 border border-[#2ecc71]/20">
            <div className="w-12 h-12 bg-[#2ecc71]/20 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-[#0b3d2e]" />
            </div>
            <h3 className="text-lg font-bold text-[#0b3d2e] mb-2">Email</h3>
            <a href="mailto:altamonteenergy@gmail.com" className="text-[#2ecc71] hover:text-[#f4d03f] transition-colors font-semibold">
              altamonteenergy@gmail.com
            </a>
          </div>

          <div className="bg-gradient-to-br from-[#F7F4EF] to-white rounded-2xl p-8 border border-[#2ecc71]/20">
            <div className="w-12 h-12 bg-[#2ecc71]/20 rounded-lg flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-[#0b3d2e]" />
            </div>
            <h3 className="text-lg font-bold text-[#0b3d2e] mb-2">WhatsApp</h3>
            <a href="https://wa.me/573045886447" target="_blank" rel="noopener noreferrer" className="text-[#2ecc71] hover:text-[#f4d03f] transition-colors font-semibold">
              +57 304 588 6447
            </a>
          </div>

          <div className="bg-gradient-to-br from-[#F7F4EF] to-white rounded-2xl p-8 border border-[#2ecc71]/20">
            <div className="w-12 h-12 bg-[#2ecc71]/20 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-[#0b3d2e]" />
            </div>
            <h3 className="text-lg font-bold text-[#0b3d2e] mb-2">Ubicación</h3>
            <p className="text-[#5a7a6a] font-semibold">
              Medellín, Colombia
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-[#F7F4EF] to-white rounded-2xl p-12 border border-[#2ecc71]/20">
            <div className="mb-6">
              <label className="block text-sm font-bold text-[#0b3d2e] mb-2">
                Nombre completo *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                className="w-full px-4 py-3 border border-[#2ecc71]/30 rounded-lg focus:outline-none focus:border-[#2ecc71] bg-white"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-[#0b3d2e] mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@correo.com"
                  className="w-full px-4 py-3 border border-[#2ecc71]/30 rounded-lg focus:outline-none focus:border-[#2ecc71] bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0b3d2e] mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+57 300 000 0000"
                  className="w-full px-4 py-3 border border-[#2ecc71]/30 rounded-lg focus:outline-none focus:border-[#2ecc71] bg-white"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-[#0b3d2e] mb-2">
                Asunto
              </label>
              <select
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#2ecc71]/30 rounded-lg focus:outline-none focus:border-[#2ecc71] bg-white"
              >
                <option value="">Selecciona un asunto</option>
                <option>Instalar un nodo en mi comunidad</option>
                <option>Alianza institucional</option>
                <option>Inversión / financiamiento</option>
                <option>Prensa / medios</option>
                <option>Otro</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-[#0b3d2e] mb-2">
                Mensaje *
              </label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Cuéntanos sobre tu comunidad, barrio o idea... ¿En qué barrio estás? ¿Cuántas familias? ¿Qué problema quieres resolver?"
                rows="6"
                className="w-full px-4 py-3 border border-[#2ecc71]/30 rounded-lg focus:outline-none focus:border-[#2ecc71] bg-white resize-none"
                required
              ></textarea>
            </div>

            {/* Honeypot — invisible para humanos */}
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
            />

            <button
              type="submit"
              disabled={enviando}
              className="w-full bg-[#2ecc71] text-[#0b3d2e] py-4 rounded-lg font-bold text-lg hover:bg-[#f4d03f] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              {enviando ? 'Enviando…' : 'Enviar mensaje'}
            </button>

            {estado === 'ok' && (
              <div className="mt-6 p-4 bg-[#f0fdf4] border border-[#2ecc71] text-[#0b3d2e] rounded-lg text-center font-semibold">
                ✓ ¡Mensaje enviado! Te contactaremos en menos de 24 horas.
              </div>
            )}

            {estado === 'error' && (
              <div className="mt-6 p-4 bg-[#fef2f2] border border-[#ef4444] text-[#991b1b] rounded-lg text-center font-semibold">
                No pudimos enviar tu mensaje. Escríbenos a{' '}
                <a href="mailto:altamonteenergy@gmail.com" className="underline">altamonteenergy@gmail.com</a>
              </div>
            )}
          </form>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0b3d2e] mb-8 text-center">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            <details className="bg-[#F7F4EF] rounded-lg p-6 cursor-pointer group hover:bg-[#f0ebe1] transition-colors">
              <summary className="font-bold text-[#0b3d2e] text-lg flex items-center justify-between">
                ¿Cuánto cuesta instalar un nodo en mi barrio?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-[#5a7a6a] mt-4 leading-relaxed">
                El costo depende del número de familias, ubicación y características del edificio. Realizamos un estudio técnico y financiero personalizado. Contáctanos para una evaluación.
              </p>
            </details>

            <details className="bg-[#F7F4EF] rounded-lg p-6 cursor-pointer group hover:bg-[#f0ebe1] transition-colors">
              <summary className="font-bold text-[#0b3d2e] text-lg flex items-center justify-between">
                ¿Necesito trámites especiales con EPM o la administración?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-[#5a7a6a] mt-4 leading-relaxed">
                Sí. Nuestro equipo coordina con EPM y la administración local. Manejamos todos los trámites de conexión a red, permisos de construcción y certificaciones.
              </p>
            </details>

            <details className="bg-[#F7F4EF] rounded-lg p-6 cursor-pointer group hover:bg-[#f0ebe1] transition-colors">
              <summary className="font-bold text-[#0b3d2e] text-lg flex items-center justify-between">
                ¿Cuál es el modelo de negocio para la comunidad?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-[#5a7a6a] mt-4 leading-relaxed">
                Energía como Servicio (EaaS). La comunidad accede a energía solar compartida sin costo inicial. Se paga por consumo real en kWh. Transparencia total vía WhatsApp.
              </p>
            </details>

            <details className="bg-[#F7F4EF] rounded-lg p-6 cursor-pointer group hover:bg-[#f0ebe1] transition-colors">
              <summary className="font-bold text-[#0b3d2e] text-lg flex items-center justify-between">
                ¿Cuánto tiempo tarda la instalación?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-[#5a7a6a] mt-4 leading-relaxed">
                De 6 a 12 semanas, dependiendo del tamaño del proyecto. Incluye: evaluación estructural, permisos, instalación de paneles, batería e IoT, y capacitación de usuarios.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
