// src/data/nodos.js
// Fuente única de los nodos DER (fuera de mockData.js, como pediste).
// Coordenadas reales aproximadas de comunas de ladera de Medellín.
// Para cambiar el estado de un nodo, edita solo el campo `estado`.
//
// estado: 'planeado' | 'ideacion'   (controla el color del marcador)
// La Torre (piloto) = planeado · los demás = en ideación.

export const NODOS = [
  {
    id: 'AM-001',
    nombre: 'La Torre',
    comuna: 'Comuna 8 · Villa Hermosa',
    estado: 'planeado',
    lat: 6.2510,
    lng: -75.5450,
    descripcion: 'Nodo piloto planeado. Primer despliegue completo con IoT real.',
  },
  {
    id: 'AM-002',
    nombre: 'El Pinal',
    comuna: 'Comuna 8 · Villa Hermosa',
    estado: 'ideacion',
    lat: 6.2486,
    lng: -75.5388,
    descripcion: 'En ideación. Evaluación de techos y comunidad.',
  },
  {
    id: 'AM-003',
    nombre: 'Llanaditas',
    comuna: 'Comuna 8 · Villa Hermosa',
    estado: 'ideacion',
    lat: 6.2453,
    lng: -75.5331,
    descripcion: 'En ideación. Estudio de viabilidad inicial.',
  },
  {
    id: 'AM-004',
    nombre: 'Carambolas',
    comuna: 'Comuna 3 · Manrique',
    estado: 'ideacion',
    lat: 6.2718,
    lng: -75.5402,
    descripcion: 'En ideación. Alianza con la JAC local en conversación.',
  },
  {
    id: 'AM-005',
    nombre: 'El Faro',
    comuna: 'Comuna 8 · Villa Hermosa',
    estado: 'ideacion',
    lat: 6.2398,
    lng: -75.5295,
    descripcion: 'En ideación. Posible expansión del corredor de la Comuna 8.',
  },
]

// Centro del mapa (Medellín) y configuración visual de estados
export const MEDELLIN_CENTER = { lat: 6.2486, lng: -75.5400 }

export const ESTADO_CONFIG = {
  planeado: { label: 'Planeado', color: '#2ECC71' },
  ideacion: { label: 'En ideación', color: '#F4D03F' },
}
