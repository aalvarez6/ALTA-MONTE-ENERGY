// src/components/NodosMap.jsx
//
// Mapa de nodos DER con Google Maps.
//
// REQUISITOS (una sola vez):
//   1. npm install @react-google-maps/api
//   2. En Google Cloud Console: crea un proyecto, activa "Maps JavaScript API",
//      activa facturación (tiene capa gratuita generosa) y crea una API key.
//   3. Restringe la key a tu dominio (alta-monte-energy.vercel.app) por seguridad.
//   4. En Vercel → Settings → Environment Variables, agrega:
//        VITE_GOOGLE_MAPS_API_KEY = tu_key
//      (el prefijo VITE_ es obligatorio para que Vite la exponga al frontend)
//   5. Redeploy.

import React, { useState } from 'react'
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api'
import { NODOS, MEDELLIN_CENTER, ESTADO_CONFIG } from '../data/nodos'

const containerStyle = { width: '100%', height: '480px', borderRadius: '16px' }

// Estilo discreto del mapa, acorde a la marca
const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  styles: [
    { featureType: 'poi', stylers: [{ visibility: 'off' }] },
    { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  ],
}

export default function NodosMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  })
  const [activo, setActivo] = useState(null)

  if (loadError) {
    return (
      <div className="rounded-2xl border border-[#2ecc71]/20 bg-[#F7F4EF] p-8 text-center text-[#5a7a6a]">
        No se pudo cargar el mapa. Verifica la API key de Google Maps.
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="rounded-2xl border border-[#2ecc71]/20 bg-[#F7F4EF] p-8 text-center text-[#5a7a6a]">
        Cargando mapa…
      </div>
    )
  }

  return (
    <div>
      {/* Leyenda */}
      <div className="flex gap-4 mb-4">
        {Object.entries(ESTADO_CONFIG).map(([k, cfg]) => (
          <div key={k} className="flex items-center gap-2 text-sm text-[#5a7a6a]">
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: cfg.color, display: 'inline-block', border: '2px solid #0B3D2E' }} />
            {cfg.label}
          </div>
        ))}
      </div>

      <GoogleMap mapContainerStyle={containerStyle} center={MEDELLIN_CENTER} zoom={12} options={mapOptions}>
        {NODOS.map((nodo) => {
          const cfg = ESTADO_CONFIG[nodo.estado] || ESTADO_CONFIG.ideacion
          return (
            <MarkerF
              key={nodo.id}
              position={{ lat: nodo.lat, lng: nodo.lng }}
              onClick={() => setActivo(nodo)}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: nodo.estado === 'planeado' ? 11 : 9,
                fillColor: cfg.color,
                fillOpacity: 1,
                strokeColor: '#0B3D2E',
                strokeWeight: 2,
              }}
            />
          )
        })}

        {activo && (
          <InfoWindowF position={{ lat: activo.lat, lng: activo.lng }} onCloseClick={() => setActivo(null)}>
            <div style={{ maxWidth: 220, fontFamily: 'Inter, sans-serif' }}>
              <div style={{ fontWeight: 700, color: '#0B3D2E', fontSize: 14 }}>{activo.nombre}</div>
              <div style={{ color: '#5a7a6a', fontSize: 12, margin: '2px 0 6px' }}>{activo.comuna}</div>
              <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 10, background: (ESTADO_CONFIG[activo.estado] || {}).color + '33', color: '#0B3D2E' }}>
                {(ESTADO_CONFIG[activo.estado] || {}).label}
              </span>
              <p style={{ color: '#5a7a6a', fontSize: 12, marginTop: 8, lineHeight: 1.5 }}>{activo.descripcion}</p>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  )
}
