// src/data/nodos.js
// Fuente única de los nodos DER. Edita aquí para agregar/cambiar nodos.
// Cuando quieras, esto se puede reemplazar por un fetch a una Google Sheet
// o una API sin tocar el resto de la app (misma estructura de objeto).
//
// estado: 'planeado' | 'ideacion'   (controla el color del marcador)
// Coordenadas aproximadas de comunas de ladera de Medellín — ajústalas
// a la ubicación real cuando la tengas.

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
