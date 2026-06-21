import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Zap, Cpu, BarChart3 } from 'lucide-react'
import SolarPanel3D from '../components/SolarPanel3D'

const SolarModulePage = () => {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#2ecc71] hover:text-[#f4d03f] transition-colors mb-8 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <div className="mb-12">
          <h1 className="text-5xl font-bold text-[#0b3d2e] mb-4">
            Módulo Solar 3D
          </h1>
          <p className="text-xl text-[#5a7a6a] max-w-3xl">
            Interactúa con el modelo de panel solar inteligente de Alta Monte Energy. Mueve tu ratón para ver diferentes ángulos del nodo energético comunitario.
          </p>
        </div>

        {/* 3D Visualization */}
        <div className="mb-16">
          <SolarPanel3D />
          <p className="text-center text-[#5a7a6a] text-sm mt-4">
            💡 Mueve tu ratón sobre el panel para controlar la rotación
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-[#F7F4EF] to-white p-8 rounded-xl border border-[#2ecc71]/20">
            <div className="w-12 h-12 bg-[#2ecc71]/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[#0b3d2e]" />
            </div>
            <h3 className="text-xl font-bold text-[#0b3d2e] mb-3">Generación Solar</h3>
            <p className="text-[#5a7a6a] leading-relaxed">
              Paneles de silicio de alta eficiencia con batería LFP comunitaria, validada con estudios estructurales en cada edificio.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#F7F4EF] to-white p-8 rounded-xl border border-[#2ecc71]/20">
            <div className="w-12 h-12 bg-[#2ecc71]/20 rounded-lg flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6 text-[#0b3d2e]" />
            </div>
            <h3 className="text-xl font-bold text-[#0b3d2e] mb-3">Inteligencia Artificial</h3>
            <p className="text-[#5a7a6a] leading-relaxed">
              IA predictiva para despacho óptimo, pronóstico de demanda y detección automática de anomalías 24/7.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#F7F4EF] to-white p-8 rounded-xl border border-[#2ecc71]/20">
            <div className="w-12 h-12 bg-[#2ecc71]/20 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-[#0b3d2e]" />
            </div>
            <h3 className="text-xl font-bold text-[#0b3d2e] mb-3">Gemelo Digital</h3>
            <p className="text-[#5a7a6a] leading-relaxed">
              Monitoreo en tiempo real con InfluxDB + Grafana. Cada familia visualiza su consumo y ahorro por WhatsApp.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-gradient-to-r from-[#0b3d2e] to-[#1f3a5f] rounded-2xl p-12 text-white mb-16">
          <h2 className="text-3xl font-bold mb-8">¿Cómo funciona el módulo?</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-[#2ecc71] mb-4">Componentes principales</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-[#f4d03f] font-bold">•</span>
                  <span>Paneles solares en techos comunitarios</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f4d03f] font-bold">•</span>
                  <span>Batería de litio LFP para almacenamiento</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f4d03f] font-bold">•</span>
                  <span>ESP32 con LoRaWAN (sin WiFi requerido)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f4d03f] font-bold">•</span>
                  <span>MQTT broker local para edge computing</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#2ecc71] mb-4">Beneficios para la comunidad</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-[#2ecc71] font-bold">✓</span>
                  <span>Energía solar compartida sin intermediarios</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#2ecc71] font-bold">✓</span>
                  <span>Respaldo ante cortes eléctricos</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#2ecc71] font-bold">✓</span>
                  <span>Visibilidad total del consumo en tiempo real</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#2ecc71] font-bold">✓</span>
                  <span>Alertas personalizadas por WhatsApp</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#f4d03f] rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-[#0b3d2e] mb-4">
            ¿Quieres instalar un nodo en tu comunidad?
          </h2>
          <p className="text-[#5a7a6a] mb-8 text-lg max-w-2xl mx-auto">
            Contáctanos para evaluar tu barrio, validar la estructura y comenzar la instalación del primer nodo inteligente.
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center justify-center gap-2 bg-[#0b3d2e] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#061e14] transition-all duration-300"
          >
            Contactar Ahora
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SolarModulePage
