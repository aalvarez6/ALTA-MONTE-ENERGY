
// Datos simulados para el Dashboard (consumo, comunas, batería).
// La curva SOLAR la reemplaza el dato real de Open-Meteo en Dashboard.jsx.

export function generate24h() {
  return Array.from({ length: 24 }, (_, h) => {
    // Solar: campana centrada al mediodía (respaldo si no hay dato real)
    const solarBase = Math.max(0, Math.sin(((h - 6) / 12) * Math.PI)) * 28
    const solar = +Math.max(0, solarBase + (Math.random() * 2 - 1)).toFixed(1)

    // Consumo: dos picos (mañana y noche)
    const manana = Math.exp(-Math.pow(h - 7, 2) / 6) * 8
    const noche = Math.exp(-Math.pow(h - 19, 2) / 5) * 12
    const consumption = +(8 + manana + noche + Math.random() * 1.5).toFixed(1)

    const balance = +(solar - consumption).toFixed(1)
    const battery = +Math.min(100, Math.max(20, 55 + (solar - consumption) * 1.5)).toFixed(0)

    return { hour: `${String(h).padStart(2, '0')}:00`, solar, consumption, balance, battery }
  })
}

export const COMMUNE_DATA = [
  { name: 'Comuna 8', generation: 42, demand: 38 },
  { name: 'Comuna 3', generation: 28, demand: 33 },
  { name: 'Comuna 1', generation: 19, demand: 25 },
  { name: 'Comuna 13', generation: 24, demand: 30 },
  { name: 'Comuna 6', generation: 21, demand: 27 },
]
EOF
