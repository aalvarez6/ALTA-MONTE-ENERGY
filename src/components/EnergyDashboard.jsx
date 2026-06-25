// src/components/EnergyDashboard.jsx
//
// Dashboard energético con MEZCLA de datos:
//  - REALES: irradiancia solar y temperatura de hoy en Medellín, vía Open-Meteo
//    (API pública y gratuita, sin API key).
//  - PROYECCIÓN: generación estimada de un nodo, calculada a partir de la
//    irradiancia real y una potencia instalada hipotética (claramente marcada).

import React, { useEffect, useState } from 'react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts'

// Medellín y supuesto de proyección (editable)
const LAT = 6.2442
const LNG = -75.5812
const KWP_NODO = 8 // kWp instalados hipotéticos para la proyección

const API = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LNG}` +
  `&hourly=shortwave_radiation,temperature_2m&timezone=America%2FBogota&forecast_days=1`

export default function EnergyDashboard() {
  const [data, setData] = useState([])
  const [estado, setEstado] = useState('cargando') // cargando | ok | error
  const [kpis, setKpis] = useState({ pico: 0, temp: 0, genDia: 0 })

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((j) => {
        const horas = j.hourly.time
        const rad = j.hourly.shortwave_radiation
        const temp = j.hourly.temperature_2m

        const rows = horas.map((t, i) => {
          const irr = rad[i] || 0
          // Generación estimada (proyección): irradiancia(kW/m²) × kWp × factor
          const gen = +(((irr / 1000) * KWP_NODO) * 0.85).toFixed(2)
          return { hora: t.slice(11, 16), irradiancia: Math.round(irr), generacion: gen }
        })

        const pico = Math.max(...rad.map((v) => v || 0))
        const ahora = new Date().getHours()
        const genDia = rows.reduce((a, b) => a + b.generacion, 0)

        setData(rows)
        setKpis({ pico: Math.round(pico), temp: Math.round(temp[ahora] || temp[12] || 0), genDia: +genDia.toFixed(1) })
        setEstado('ok')
      })
      .catch(() => setEstado('error'))
  }, [])

  return (
    <div className="bg-white rounded-2xl border border-[#2ecc71]/20 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <div>
          <h3 className="text-xl font-bold text-[#0b3d2e]">Recurso solar · Medellín (hoy)</h3>
          <p className="text-sm text-[#5a7a6a]">Datos reales de irradiancia · generación estimada como proyección</p>
        </div>
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#2ecc71] bg-[#2ecc71]/10 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#2ecc71] animate-pulse" /> Open-Meteo · en vivo
        </span>
      </div>

      {estado === 'cargando' && <p className="text-[#5a7a6a] py-12 text-center">Cargando datos solares…</p>}
      {estado === 'error' && <p className="text-[#991b1b] py-12 text-center">No se pudieron cargar los datos solares. Reintenta más tarde.</p>}

      {estado === 'ok' && (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Kpi label="Irradiancia pico" valor={`${kpis.pico} W/m²`} nota="dato real" />
            <Kpi label="Temperatura" valor={`${kpis.temp} °C`} nota="dato real" />
            <Kpi label="Generación estimada" valor={`${kpis.genDia} kWh`} nota={`proyección · ${KWP_NODO} kWp`} />
          </div>

          {/* Gráfico */}
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gIrr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F4D03F" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#F4D03F" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="gGen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2ECC71" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#2ECC71" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="hora" tick={{ fontSize: 11, fill: '#5a7a6a' }} interval={2} />
              <YAxis tick={{ fontSize: 11, fill: '#5a7a6a' }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="irradiancia" name="Irradiancia real (W/m²)" stroke="#F4D03F" fill="url(#gIrr)" strokeWidth={2} />
              <Area type="monotone" dataKey="generacion" name="Generación estimada (kWh)" stroke="#2ECC71" fill="url(#gGen)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>

          <p className="text-xs text-[#9aa89e] mt-3">
            Irradiancia: dato real de Open-Meteo para Medellín. La generación es una estimación
            ilustrativa basada en {KWP_NODO} kWp; los valores reales del nodo estarán disponibles
            cuando el IoT de La Torre esté en operación.
          </p>
        </>
      )}
    </div>
  )
}

function Kpi({ label, valor, nota }) {
  return (
    <div className="bg-[#F7F4EF] rounded-xl p-4 border border-[#2ecc71]/10">
      <div className="text-[10px] uppercase tracking-wide text-[#9aa89e]">{label}</div>
      <div className="text-lg font-bold text-[#0b3d2e] mt-1">{valor}</div>
      <div className="text-[10px] text-[#2ecc71] mt-1">{nota}</div>
    </div>
  )
}
