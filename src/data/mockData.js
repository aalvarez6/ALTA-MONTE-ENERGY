/* ════════════════════════════════════════════════════════════════
   CAPA DE DATOS — Alta Monte Energy
   ────────────────────────────────────────────────────────────────
   Este es el ÚNICO archivo que debes modificar cuando tengas tu API
   o backend real. Hoy devuelve datos de ejemplo realistas; mañana
   reemplazas el cuerpo de cada función por un fetch() a tu servidor.

   Ejemplo de migración futura:
     export async function getNodos() {
       const res = await fetch('https://api.altamonte.energy/nodos')
       return res.json()
     }

   Mientras tanto, todo es síncrono y simulado.
   ════════════════════════════════════════════════════════════════ */

/* ── NODOS DER (barrios de ladera de Medellín) ──
   Coordenadas reales aproximadas de comunas de ladera. */
export const NODOS = [
  {
    id: 'la-torre-c8',
    nombre: 'Nodo La Torre',
    comuna: 'Comuna 8 · Villa Hermosa',
    estado: 'planeado',
    lat: 6.2518,
    lng: -75.5380,
    descripcion: 'Primer nodo piloto. Solar distribuido + batería comunitaria + gemelo digital.',
  },
  {
    id: 'popular-c1',
    nombre: 'Nodo Popular',
    comuna: 'Comuna 1 · Popular',
    estado: 'ideacion',
    lat: 6.2960,
    lng: -75.5450,
    descripcion: 'En ideación. Evaluación de comunidad y techos disponibles.',
  },
  {
    id: 'manrique-c3',
    nombre: 'Nodo Manrique',
    comuna: 'Comuna 3 · Manrique',
    estado: 'ideacion',
    lat: 6.2780,
    lng: -75.5500,
    descripcion: 'En ideación. Identificación de aliados locales.',
  },
  {
    id: 'san-javier-c13',
    nombre: 'Nodo San Javier',
    comuna: 'Comuna 13 · San Javier',
    estado: 'ideacion',
    lat: 6.2560,
    lng: -75.6150,
    descripcion: 'En ideación. Potencial alto por comunidad organizada.',
  },
  {
    id: 'doce-octubre-c6',
    nombre: 'Nodo Doce de Octubre',
    comuna: 'Comuna 6 · Doce de Octubre',
    estado: 'ideacion',
    lat: 6.2950,
    lng: -75.5800,
    descripcion: 'En ideación. Mapeo inicial de demanda energética.',
  },
]

// Centro del mapa (Medellín) y configuración de estados
export const MEDELLIN_CENTER = { lat: 6.2476, lng: -75.5658 }

export const ESTADO_CONFIG = {
  planeado: { label: 'Planeado', color: '#2ECC71' },
  ideacion: { label: 'En ideación', color: '#F4D03F' },
}

/* ── Serie de 24h: generación vs consumo (para gráfica de líneas) ──
   Patrón solar realista: 0 de noche, pico al mediodía. */
export function getCurva24h() {
  const horas = Array.from({ length: 24 }, (_, h) => h)
  return horas.map((h) => {
    // Generación: campana solar centrada ~13h
    const solar = Math.max(0, Math.sin(((h - 6) / 12) * Math.PI)) * 28
    const generacion = +(solar + (Math.random() * 2 - 1)).toFixed(1)
    // Consumo: dos picos (mañana y noche)
    const base = 8
    const manana = Math.exp(-Math.pow(h - 7, 2) / 6) * 8
    const noche = Math.exp(-Math.pow(h - 19, 2) / 5) * 12
    const consumo = +(base + manana + noche + (Math.random() * 1.5)).toFixed(1)
    return {
      hora: `${String(h).padStart(2, '0')}:00`,
      generacion: Math.max(0, generacion),
      consumo
    }
  })
}

/* ── Distribución de energía (para gráfica de dona) ── */
export function getDistribucion() {
  return [
    { nombre: 'Autoconsumo', valor: 62, color: '#2ECC71' },
    { nombre: 'Batería', valor: 23, color: '#F4D03F' },
    { nombre: 'Excedente a red', valor: 15, color: '#1F6FA5' }
  ]
}

/* ── Aporte por familia (barras, para sección de transparencia) ── */
export function getAporteFamilias() {
  return [
    { bloque: 'Bloque A', aporte: 28 },
    { bloque: 'Bloque B', aporte: 22 },
    { bloque: 'Bloque C', aporte: 31 },
    { bloque: 'Bloque D', aporte: 19 }
  ]
}

/* ── DIGITAL TWIN: estado de componentes del nodo en tiempo real ── */
export function getDigitalTwin() {
  return {
    nodoId: 'AM-001',
    nodoNombre: 'La Torre',
    actualizado: new Date().toISOString(),
    componentes: [
      { id: 'panel', nombre: 'Arreglo Solar', estado: 'optimo',   metrica: '21.4 kW', detalle: '32 paneles · 94% eficiencia' },
      { id: 'inversor', nombre: 'Inversor Híbrido', estado: 'optimo', metrica: '20.1 kW', detalle: 'Temperatura 42°C · normal' },
      { id: 'bateria', nombre: 'Batería LFP', estado: 'cargando', metrica: '78%', detalle: '60 kWh · ciclo 1,204' },
      { id: 'medidor', nombre: 'Medidor Bidireccional', estado: 'optimo', metrica: '6.6 kW', detalle: 'Exportando a red' },
      { id: 'gateway', nombre: 'Gateway IoT (ESP32)', estado: 'optimo', metrica: 'Online', detalle: 'LoRaWAN · RSSI -67 dBm' },
      { id: 'sensor', nombre: 'Sensores Ambientales', estado: 'alerta', metrica: '1 aviso', detalle: 'Sensor temp. B requiere revisión' }
    ],
    sensores: {
      irradiancia: 842,      // W/m²
      tempPanel: 48,         // °C
      tempAmbiente: 26,      // °C
      humedad: 64,           // %
      voltajeDC: 385,        // V
      frecuenciaHz: 60.0
    }
  }
}

/* ── Alertas recientes (feed del dashboard) ── */
export function getAlertas() {
  return [
    { tipo: 'ok',      hora: '13:42', texto: 'Batería alcanzó 78% — excedente compartido a la red' },
    { tipo: 'aviso',   hora: '12:15', texto: 'Sensor de temperatura Bloque B requiere revisión' },
    { tipo: 'ok',      hora: '09:30', texto: 'Generación solar superó el consumo del nodo' },
    { tipo: 'info',    hora: '06:05', texto: 'Inicio de generación — amanecer detectado' }
  ]
}
