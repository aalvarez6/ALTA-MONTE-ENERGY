import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Activity, Sun, Battery, Gauge } from 'lucide-react'
import EnergyDashboard from '../components/EnergyDashboard'

const DashboardPage = () => {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-[#2ecc71] hover:text-[#f4d03f] transition-colors mb-8 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        {/* Encabezado */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#2ecc71] uppercase mb-3">
            <Activity className="w-4 h-4" /> Gemelo digital
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0b3d2e] mb-4">Dashboard energético</h1>
          <p className="text-lg text-[#5a7a6a] max-w-3xl">
            Visualiza el recurso solar de Medellín en tiempo real y la energía que un nodo
            como La Torre podría generar. Cuando el IoT esté en operación, estos paneles
            mostrarán los datos reales de cada nodo.
          </p>
        </div>

        {/* Dashboard solar con datos reales */}
        <div className="mb-12">
          <EnergyDashboard />
        </div>

        {/* Qué verás aquí cuando el nodo esté activo */}
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Sun className="w-6 h-6 text-[#0b3d2e]" />}
            title="Generación solar"
            text="Curvas de generación real por nodo y por hogar, hora a hora."
          />
          <FeatureCard
            icon={<Battery className="w-6 h-6 text-[#0b3d2e]" />}
            title="Estado de batería"
            text="Carga, descarga y respaldo comunitario disponible ante cortes."
          />
          <FeatureCard
            icon={<Gauge className="w-6 h-6 text-[#0b3d2e]" />}
            title="Consumo y ahorro"
            text="Cuánto consume y ahorra cada familia, con total transparencia."
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-gradient-to-br from-[#F7F4EF] to-white rounded-2xl p-8 border border-[#2ecc71]/20">
      <div className="w-12 h-12 bg-[#2ecc71]/20 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[#0b3d2e] mb-2">{title}</h3>
      <p className="text-[#5a7a6a] leading-relaxed">{text}</p>
    </div>
  )
}

export default DashboardPage
