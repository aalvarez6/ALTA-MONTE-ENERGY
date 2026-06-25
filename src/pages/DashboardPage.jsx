import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Zap, Battery, TrendingUp, Leaf, Users, Share2 } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts'
import { getKpis, getCurva24h, getDistribucion, getAporteFamilias, getAlertas } from '../data/mockData'
import EnergyDashboard from '../components/EnergyDashboard'
import NodosMap from '../components/NodosMap'

const KpiCard = ({ icon: Icon, label, value, unit, accent }) => (
  <div className="bg-white rounded-2xl p-6 border border-[#2ecc71]/15 shadow-sm hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between mb-3">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${accent}22` }}>
        <Icon className="w-5 h-5" style={{ color: accent }} />
      </div>
      <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-[#2ecc71] uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2ecc71] animate-pulse"></span>Live
      </span>
    </div>
    <div className="text-2xl font-bold text-[#0b3d2e]">{value}<span className="text-sm font-medium text-[#5a7a6a] ml-1">{unit}</span></div>
    <div className="text-xs text-[#5a7a6a] mt-1 uppercase tracking-wide">{label}</div>
  </div>
)

const DashboardPage = () => {
  const kpis = getKpis()
  const curva = getCurva24h()
  const distribucion = getDistribucion()
  const aportes = getAporteFamilias()
  const alertas = getAlertas()

  return (
    <div className="pt-16 min-h-screen bg-[#F7F4EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-[#2ecc71] hover:text-[#0b9d5a] transition-colors mb-6 font-semibold">
          <ArrowLeft className="w-4 h-4" />Volver al inicio
        </Link>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#0b3d2e] mb-1">Dashboard Energético</h1>
            <p className="text-[#5a7a6a]">Nodo <strong>La Torre</strong> · Comuna 8 · Medellín</p>
          </div>
          <div className="flex items-center gap-2 bg-[#0b3d2e] text-white px-4 py-2 rounded-lg text-sm">
            <span className="w-2 h-2 rounded-full bg-[#2ecc71] animate-pulse"></span>
            Datos en tiempo real (simulados)
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KpiCard icon={Zap} label="Generación" value={kpis.generacionKw} unit="kW" accent="#2ECC71" />
          <KpiCard icon={TrendingUp} label="Consumo" value={kpis.consumoKw} unit="kW" accent="#1F6FA5" />
          <KpiCard icon={Battery} label="Batería" value={kpis.bateriaPct} unit="%" accent="#F4D03F" />
          <KpiCard icon={Share2} label="Excedente" value={kpis.excedenteKw} unit="kW" accent="#2ECC71" />
        </div>

        {/* Gráfica principal + dona */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Curva 24h */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#2ecc71]/15 shadow-sm">
            <h3 className="font-bold text-[#0b3d2e] mb-1">Generación vs Consumo</h3>
            <p className="text-xs text-[#5a7a6a] mb-4">Últimas 24 horas · kW</p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={curva} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d5" />
                <XAxis dataKey="hora" tick={{ fontSize: 11, fill: '#5a7a6a' }} interval={3} />
                <YAxis tick={{ fontSize: 11, fill: '#5a7a6a' }} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #2ecc71', fontSize: 12 }} />
                <Line type="monotone" dataKey="generacion" name="Generación" stroke="#2ECC71" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="consumo" name="Consumo" stroke="#1F6FA5" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Distribución dona */}
          <div className="bg-white rounded-2xl p-6 border border-[#2ecc71]/15 shadow-sm">
            <h3 className="font-bold text-[#0b3d2e] mb-1">Distribución</h3>
            <p className="text-xs text-[#5a7a6a] mb-4">Uso de la energía generada</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={distribucion} dataKey="valor" nameKey="nombre" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {distribucion.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {distribucion.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-[#5a7a6a]">
                    <span className="w-3 h-3 rounded-sm" style={{ background: d.color }}></span>{d.nombre}
                  </span>
                  <span className="font-bold text-[#0b3d2e]">{d.valor}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Aporte familias + impacto + alertas */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Barras aporte */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#2ecc71]/15 shadow-sm">
            <h3 className="font-bold text-[#0b3d2e] mb-1">Aporte por bloque</h3>
            <p className="text-xs text-[#5a7a6a] mb-4">Energía compartida a la comunidad · kWh hoy</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={aportes} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d5" />
                <XAxis dataKey="bloque" tick={{ fontSize: 11, fill: '#5a7a6a' }} />
                <YAxis tick={{ fontSize: 11, fill: '#5a7a6a' }} />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} cursor={{ fill: '#2ecc7111' }} />
                <Bar dataKey="aporte" name="Aporte" fill="#2ECC71" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Panel lateral: impacto + alertas */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#0b3d2e] to-[#1f3a5f] rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#2ecc71]" />
                <h3 className="font-bold">Impacto hoy</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-[#2ecc71]">{kpis.co2EvitadoKg} <span className="text-base font-medium">kg</span></div>
                  <div className="text-xs text-white/60">CO₂ evitado</div>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  <Users className="w-4 h-4 text-[#f4d03f]" />
                  <span className="text-sm"><strong>{kpis.familiasActivas}</strong> familias activas</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#2ecc71]/15 shadow-sm">
              <h3 className="font-bold text-[#0b3d2e] mb-4">Alertas recientes</h3>
              <div className="space-y-3">
                {alertas.map((a, i) => {
                  const color = a.tipo === 'ok' ? '#2ECC71' : a.tipo === 'aviso' ? '#F4D03F' : '#1F6FA5'
                  return (
                    <div key={i} className="flex gap-3 text-xs">
                      <span className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ background: color }}></span>
                      <div>
                        <span className="text-[#5a7a6a]">{a.texto}</span>
                        <span className="block text-[10px] text-[#9aada4] mt-0.5">{a.hora}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Nota de conexión real */}
        <div className="mt-8 bg-[#2ecc71]/8 border border-[#2ecc71]/25 rounded-xl p-4 text-sm text-[#0b3d2e]">
          💡 <strong>Datos de ejemplo.</strong> Cuando conectes tu API/IoT real, solo se actualiza el archivo <code className="bg-white px-1.5 py-0.5 rounded text-xs">src/data/mockData.js</code> — la interfaz no cambia.
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
