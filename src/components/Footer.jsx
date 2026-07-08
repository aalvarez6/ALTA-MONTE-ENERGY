import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

/*
  Footer balanceado:
  - 4 columnas de ancho idéntico (grid-cols-4, gap uniforme 32px)
  - Encabezados con la misma clase exacta → misma altura de línea base
  - Listas con ritmo vertical constante (space-y-3 = 12px)
  - Iconos a 16px alineados con flex items-center
  - Barra inferior centrada con separador
*/

const HEAD = 'text-white font-semibold text-xs uppercase tracking-[0.16em] mb-5'
const ITEM = 'text-white/60 text-sm leading-relaxed'
const LINKC = 'text-white/60 hover:text-[#2ecc71] text-sm leading-relaxed transition-colors'

const Footer = () => {
  return (
    <footer className="bg-[#0b3d2e] border-t border-[#2ecc71]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1 — Marca */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#2ecc71]/50 bg-[#0b3d2e] flex items-center justify-center flex-shrink-0">
                <img
                  src="/AM_Imagenes/Logo_White(2)"
                  alt="Alta Monte Energy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.parentElement.style.display = 'none'
                    e.target.parentElement.nextElementSibling.style.display = 'flex'
                  }}
                />
              </div>
              <div className="w-11 h-11 bg-[#f7f4ef] rounded-full items-center justify-center flex-shrink-0" style={{ display: 'none' }}>
                <span className="font-bold text-[#0b3d2e]">AM</span>
              </div>
              <span className="font-bold text-white text-base leading-tight">Alta Monte<br />Energy</span>
            </div>
            <p className={ITEM}>
              Nodos energéticos comunitarios inteligentes en barrios de ladera de Medellín.
            </p>
          </div>

          {/* Col 2 — Explora */}
          <div>
            <h4 className={HEAD}>Explora</h4>
            <ul className="space-y-3">
              <li><Link to="/" className={LINKC}>Inicio</Link></li>
              <li><Link to="/dashboard" className={LINKC}>Dashboard</Link></li>
              <li><Link to="/nodos" className={LINKC}>Nodos DER</Link></li>
              <li><Link to="/digital-twin" className={LINKC}>Digital Twin</Link></li>
            </ul>
          </div>

          {/* Col 3 — Compromisos ODS */}
          <div>
            <h4 className={HEAD}>Compromisos ODS</h4>
            <ul className="space-y-3">
              <li className={`${ITEM} flex items-center gap-2.5`}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#FCC30B' }}></span>
                ODS 7 · Energía asequible
              </li>
              <li className={`${ITEM} flex items-center gap-2.5`}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#DD1367' }}></span>
                ODS 10 · Menos desigualdad
              </li>
              <li className={`${ITEM} flex items-center gap-2.5`}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#FD9D24' }}></span>
                ODS 11 · Ciudades sostenibles
              </li>
              <li className={`${ITEM} flex items-center gap-2.5`}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#3F7E44' }}></span>
                ODS 13 · Acción climática
              </li>
            </ul>
          </div>

          {/* Col 4 — Contacto */}
          <div>
            <h4 className={HEAD}>Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:altamonteenergy@gmail.com" className={`${LINKC} flex items-center gap-2.5 group`}>
                  <Mail size={16} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
                  altamonteenergy@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/573045886447" target="_blank" rel="noopener noreferrer" className={`${LINKC} flex items-center gap-2.5 group`}>
                  <Phone size={16} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
                  +57 304 588 6447
                </a>
              </li>
              <li className={`${ITEM} flex items-center gap-2.5`}>
                <MapPin size={16} className="flex-shrink-0" />
                Medellín, Colombia
              </li>
              <li className={`${ITEM} flex items-center gap-2.5`}>
                <Clock size={16} className="flex-shrink-0" />
                Respuesta &lt; 24 horas
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior — centrada y simétrica */}
        <div className="border-t border-[#2ecc71]/10 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/50 text-sm text-center">
            <p>&copy; 2026 Alta Monte Energy. Todos los derechos reservados.</p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#2ecc71] rounded-full flex-shrink-0"></span>
              Comprometidos con la Agenda ODS 2030
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
