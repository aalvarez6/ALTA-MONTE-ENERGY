import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Activity, Thermometer, Sun, Droplets, Gauge, Radio } from 'lucide-react'
import SolarPanel3D from '../components/SolarPanel3D'
import { getDigitalTwin } from '../data/mockData'

/* Color por estado de componente */
const ESTADO_COMP = {
  optimo:   { color: '#2ECC71', label: 'Óptimo' },
  cargando: { color: '#F4D03F', label: 'Cargando' },
  alerta:   { color: '#E67E22', label: 'Requiere atención' },
  fallo:    { color: '#E74C3C', label: 'Fallo' }
}

const SensorChip = ({ icon: Icon, label, value, unit }) => (
  <div className="bg-white/8 border border-white/10 rounded-xl p-4">
    <Icon className="w-4 h-4 text-[#2ecc71] mb-2" />
    <div className="text-xl font-bold text-white">{value}<span className="text-xs font-medium text-white/50 ml-1">{unit}</span></div>
    <div className="text-[10px] text-white/50 uppercase tracking-wide mt-0.5">{label}</div>
  </div>
)

const DigitalTwinPage = () => {
  const twin = getDigitalTwin()
  const s = twin.sensores

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-[#0b3d2e] to-[#061e14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-[#2ecc71] hover:text-[#34d77f] transition-colors mb-6 font-semibold">
          <ArrowLeft className="w-4 h-4" />Volver al inicio
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-1">Gemelo Digital</h1>
            <p className="text-white/60">Nodo <strong className="text-[#2ecc71]">{twin.nodoNombre}</strong> · {twin.nodoId} · réplica virtual en tiempo real</p>
          </div>
          <div className="flex items-center gap-2 bg-[#2ecc71]/15 text-[#2ecc71] px-4 py-2 rounded-lg text-sm font-semibold">
            <Activity className="w-4 h-4" />Sincronizado
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Modelo 3D */}
          <div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-2 mb-3">
              <SolarPanel3D />
            </div>
            <p className="text-center text-white/50 text-xs">🖱️ Mueve el ratón para rotar el modelo del nodo</p>
          </div>

          {/* Sensores en vivo */}
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Radio className="w-5 h-5 text-[#2ecc71]" />Sensores en vivo
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <SensorChip icon={Sun} label="Irradiancia" value={s.irradiancia} unit="W/m²" />
              <SensorChip icon={Thermometer} label="Temp. panel" value={s.tempPanel} unit="°C" />
              <SensorChip icon={Thermometer} label="Temp. ambiente" value={s.tempAmbiente} unit="°C" />
              <SensorChip icon={Droplets} label="Humedad" value={s.humedad} unit="%" />
              <SensorChip icon={Gauge} label="Voltaje DC" value={s.voltajeDC} unit="V" />
              <SensorChip icon={Activity} label="Frecuencia" value={s.frecuenciaHz} unit="Hz" />
            </div>
          </div>
        </div>

        {/* Componentes del nodo */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-5 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#2ecc71]" />Estado de componentes
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {twin.componentes.map((c) => {
              const e = ESTADO_COMP[c.estado]
              return (
                <div key={c.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#2ecc71]/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold text-sm">{c.nombre}</span>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase" style={{ color: e.color }}>
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: e.color }}></span>{e.label}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{c.metrica}</div>
                  <div className="text-xs text-white/50">{c.detalle}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-6 bg-[#2ecc71]/10 border border-[#2ecc71]/25 rounded-xl p-4 text-sm text-white/80">
          💡 <strong className="text-white">Datos de ejemplo.</strong> El estado del gemelo digital se define en <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">src/data/mockData.js</code>. Conecta tu broker MQTT / API para reflejar el nodo físico real.
        </div>
      </div>
    </div>
  )
}

export default DigitalTwinPage
