import React from 'react'

/*
  FlyingBirds — Barranqueros andinos volando sobre el hero.
  Cada ave es un SVG con alas animadas (aleteo) que cruza la pantalla
  en una trayectoria curva. Colores inspirados en el Barranquero Andino:
  cuerpo verde-turquesa, pecho canela, antifaz negro, cola de raqueta.
  Todo es decorativo y no interfiere con clics (pointer-events: none).
*/

const Bird = ({ delay = 0, duration = 22, top = '20%', scale = 1, flip = false }) => {
  return (
    <div
      className="amb-bird"
      style={{
        top,
        transform: `scale(${scale}) ${flip ? 'scaleX(-1)' : ''}`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    >
      <svg
        viewBox="0 0 120 80"
        width="120"
        height="80"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Cola larga con raqueta (característica del barranquero) */}
        <line x1="38" y1="42" x2="14" y2="58" stroke="#1f8a70" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="12" cy="60" rx="4" ry="6" fill="#2ecc71" transform="rotate(35 12 60)" />

        {/* Cuerpo verde-turquesa */}
        <ellipse cx="58" cy="40" rx="22" ry="13" fill="#1f8a70" />
        <ellipse cx="58" cy="38" rx="20" ry="11" fill="#2ecc71" />

        {/* Pecho canela/ocre */}
        <ellipse cx="68" cy="42" rx="11" ry="8" fill="#d99a4e" />

        {/* Cabeza */}
        <circle cx="82" cy="34" r="11" fill="#2ecc71" />
        {/* Corona azulada */}
        <path d="M73 30 Q82 22 91 30 Q82 28 73 30 Z" fill="#1f6fa5" />
        {/* Antifaz negro (rasgo distintivo) */}
        <ellipse cx="85" cy="34" rx="5" ry="3.5" fill="#0b2e22" />
        {/* Ojo */}
        <circle cx="86" cy="33" r="1.6" fill="#ffffff" />

        {/* Pico */}
        <path d="M92 35 L104 37 L92 40 Z" fill="#0b2e22" />

        {/* Ala superior (animada con aleteo) */}
        <g className="amb-wing amb-wing-up">
          <path d="M50 34 Q40 12 64 20 Q58 30 50 34 Z" fill="#1f8a70" />
          <path d="M52 33 Q46 18 62 23 Q57 30 52 33 Z" fill="#34d77f" />
        </g>

        {/* Ala inferior (animada, contrafase) */}
        <g className="amb-wing amb-wing-down">
          <path d="M50 44 Q40 64 64 56 Q58 48 50 44 Z" fill="#176b56" />
          <path d="M52 45 Q46 58 62 53 Q57 48 52 45 Z" fill="#2ecc71" />
        </g>
      </svg>
    </div>
  )
}

const FlyingBirds = () => {
  return (
    <div className="amb-birds-layer" aria-hidden="true">
      {/* Dos barranqueros principales + uno pequeño al fondo */}
      <Bird delay={0}  duration={24} top="18%" scale={1}    />
      <Bird delay={6}  duration={28} top="32%" scale={0.7}  />
      <Bird delay={13} duration={32} top="12%" scale={0.45} />
    </div>
  )
}

export default FlyingBirds
