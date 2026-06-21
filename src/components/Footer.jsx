import React from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[#0b3d2e] border-t border-[#2ecc71]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/AM_Imagenes/Logo_White(2)"
                alt="Alta Monte Energy"
                className="h-11 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="w-10 h-10 bg-[#f7f4ef] rounded-lg items-center justify-center" style={{ display: 'none' }}>
                <span className="font-bold text-[#0b3d2e]">AM</span>
              </div>
              <span className="font-bold text-white text-lg">Alta Monte Energy</span>
            </div>
            <p className="text-[#ffffff]/60 text-sm leading-relaxed">
              Nodos energéticos comunitarios inteligentes en barrios de ladera de Medellín.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-[#ffffff]/60 hover:text-[#2ecc71] transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/modulo-solar" className="text-[#ffffff]/60 hover:text-[#2ecc71] transition-colors">
                  Módulo Solar 3D
                </a>
              </li>
              <li>
                <a href="/tecnologia" className="text-[#ffffff]/60 hover:text-[#2ecc71] transition-colors">
                  Tecnología
                </a>
              </li>
              <li>
                <a href="/impacto" className="text-[#ffffff]/60 hover:text-[#2ecc71] transition-colors">
                  Impacto
                </a>
              </li>
            </ul>
          </div>

          {/* ODS */}
          <div>
            <h4 className="font-bold text-white mb-4">Compromisos ODS</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-[#ffffff]/60">
                <span className="text-[#FCC30B]">●</span> ODS 7 - Energía asequible
              </li>
              <li className="text-[#ffffff]/60">
                <span className="text-[#DD1367]">●</span> ODS 10 - Reducción de desigualdades
              </li>
              <li className="text-[#ffffff]/60">
                <span className="text-[#FD9D24]">●</span> ODS 11 - Ciudades sostenibles
              </li>
              <li className="text-[#ffffff]/60">
                <span className="text-[#3F7E44]">●</span> ODS 13 - Acción climática
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">Contacto</h4>
            <div className="space-y-3">
              <a
                href="mailto:altamonteenergy@gmail.com"
                className="flex items-center gap-2 text-[#ffffff]/60 hover:text-[#2ecc71] transition-colors text-sm group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                altamonteenergy@gmail.com
              </a>
              <a
                href="https://wa.me/573045886447"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#ffffff]/60 hover:text-[#2ecc71] transition-colors text-sm group"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                +57 304 588 6447
              </a>
              <div className="flex items-center gap-2 text-[#ffffff]/60 text-sm">
                <MapPin className="w-4 h-4" />
                Medellín, Colombia
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#2ecc71]/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-[#ffffff]/50 text-sm">
            <p>&copy; 2026 Alta Monte Energy. Todos los derechos reservados.</p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#2ecc71] rounded-full"></span>
              Comprometidos con la Agenda ODS 2030
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
