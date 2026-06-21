import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Users, Zap, Battery, Circle } from 'lucide-react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { NODOS } from '../data/mockData'

/* Colores por estado del nodo */
const ESTADO = {
  activo:       { color: '#2ECC71', label: 'Activo',        bg: '#2ecc7118' },
  construccion: { color: '#F4D03F', label: 'En construcción', bg: '#f4d03f18' },
  planeado:     { color: '#1F6FA5', label: 'Planeado',       bg: '#1f6fa518' }
}

const NodosPage = () => {
  const [seleccionado, setSeleccionado] = useState(NODOS[0])
  const centro = [6.2520, -75.5380] // centro aprox. Comuna 8

  return (
    <div className="pt-16 min-h-screen bg-[#F7F4EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-[#2ecc71] hover:text-[#0b9d5a] transition-colors mb-6 font-semibold">
          <ArrowLeft className="w-4 h-4" />Volver al inicio
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0b3d2e] mb-1">Red de Nodos DER</h1>
          <p className="text-[#5a7a6a]">Nodos energéticos comunitarios en barrios de ladera de Medellín</p>
        </div>

        {/* Leyenda */}
        <div className="flex flex-wrap gap-4 mb-6">
          {Object.entries(ESTADO).map(([k, v]) => (
            <div key={k} className="flex items-center gap-2 text-sm text-[#5a7a6a]">
              <span className="w-3 h-3 rounded-full" style={{ background: v.color }}></span>{v.label}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Mapa */}
          <div className="lg:col-span-2 bg-white rounded-2xl overflow-hidden border border-[#2ecc71]/15 shadow-sm" style={{ height: 480 }}>
            <MapContainer center={centro} zoom={14} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {NODOS.map((n) => (
                <CircleMarker
                  key={n.id}
                  center={[n.lat, n.lng]}
                  radius={12}
                  pathOptions={{ color: ESTADO[n.estado].color, fillColor: ESTADO[n.estado].color, fillOpacity: 0.7, weight: 2 }}
                  eventHandlers={{ click: () => setSeleccionado(n) }}
                >
                  <Popup>
                    <strong>{n.nombre}</strong><br />{n.comuna}<br />
                    {n.familias} familias · {n.panelesKw} kW
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>

          {/* Detalle del nodo seleccionado */}
          <div className="bg-white rounded-2xl p-6 border border-[#2ecc71]/15 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold tracking-wider text-[#5a7a6a] uppercase">{seleccionado.id}</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: ESTADO[seleccionado.estado].bg, color: ESTADO[seleccionado.estado].color }}>
                {ESTADO[seleccionado.estado].label}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#0b3d2e] mb-1">{seleccionado.nombre}</h2>
            <p className="text-sm text-[#5a7a6a] flex items-center gap-1.5 mb-5">
              <MapPin className="w-4 h-4" />{seleccionado.comuna}
            </p>
            <p className="text-sm text-[#5a7a6a] leading-relaxed mb-6">{seleccionado.descripcion}</p>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#F7F4EF] rounded-xl p-3 text-center">
                <Users className="w-4 h-4 text-[#2ecc71] mx-auto mb-1" />
                <div className="font-bold text-[#0b3d2e]">{seleccionado.familias}</div>
                <div className="text-[10px] text-[#5a7a6a] uppercase">Familias</div>
              </div>
              <div className="bg-[#F7F4EF] rounded-xl p-3 text-center">
                <Zap className="w-4 h-4 text-[#f4d03f] mx-auto mb-1" />
                <div className="font-bold text-[#0b3d2e]">{seleccionado.panelesKw}</div>
                <div className="text-[10px] text-[#5a7a6a] uppercase">kW solar</div>
              </div>
              <div className="bg-[#F7F4EF] rounded-xl p-3 text-center">
                <Battery className="w-4 h-4 text-[#1f6fa5] mx-auto mb-1" />
                <div className="font-bold text-[#0b3d2e]">{seleccionado.bateriaKwh}</div>
                <div className="text-[10px] text-[#5a7a6a] uppercase">kWh bat.</div>
              </div>
            </div>

            {seleccionado.estado === 'activo' && (
              <Link to="/digital-twin" className="block mt-5 text-center bg-[#0b3d2e] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#2ecc71] hover:text-[#0b3d2e] transition-all">
                Ver gemelo digital →
              </Link>
            )}
          </div>
        </div>

        {/* Lista de nodos */}
        <div className="mt-8">
          <h3 className="font-bold text-[#0b3d2e] mb-4">Todos los nodos ({NODOS.length})</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {NODOS.map((n) => (
              <button
                key={n.id}
                onClick={() => setSeleccionado(n)}
                className={`text-left bg-white rounded-xl p-5 border transition-all hover:shadow-lg ${seleccionado.id === n.id ? 'border-[#2ecc71] shadow-md' : 'border-[#2ecc71]/15'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[#0b3d2e]">{n.nombre}</span>
                  <Circle className="w-3 h-3 flex-shrink-0" fill={ESTADO[n.estado].color} stroke="none" />
                </div>
                <p className="text-xs text-[#5a7a6a] mb-3">{n.comuna}</p>
                <div className="flex gap-4 text-xs text-[#5a7a6a]">
                  <span>{n.familias} familias</span>
                  <span>{n.panelesKw} kW</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-[#2ecc71]/8 border border-[#2ecc71]/25 rounded-xl p-4 text-sm text-[#0b3d2e]">
          💡 <strong>Datos de ejemplo.</strong> Los nodos y coordenadas viven en <code className="bg-white px-1.5 py-0.5 rounded text-xs">src/data/mockData.js</code>. Conecta tu API para mostrar nodos reales.
        </div>
      </div>
    </div>
  )
}

export default NodosPage
