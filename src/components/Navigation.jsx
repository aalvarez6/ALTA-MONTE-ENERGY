import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, LayoutDashboard, MapPin, Boxes } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [platformOpen, setPlatformOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  /* Navega a una sección de la home. Si no estamos en la home, primero va a "/" y luego baja. */
  const goToSection = (hash) => {
    setIsOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const platform = [
    { to: '/dashboard',    label: 'Dashboard',    icon: LayoutDashboard, desc: 'KPIs y gráficas de energía' },
    { to: '/nodos',        label: 'Nodos DER',    icon: MapPin,          desc: 'Mapa de nodos comunitarios' },
    { to: '/digital-twin', label: 'Digital Twin', icon: Boxes,           desc: 'Gemelo digital en vivo' }
  ]

  const sectionLink = "text-white/70 hover:text-[#2ecc71] text-sm font-medium transition-colors cursor-pointer bg-transparent border-none"

  return (
    <nav className="fixed w-full top-0 z-50 bg-[#0b3d2e]/97 backdrop-blur-md border-b border-[#2ecc71]/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/AM_Imagenes/Logo_White(2)"
              alt="Alta Monte Energy"
              className="h-10 w-auto"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="w-10 h-10 bg-[#f7f4ef] rounded-lg items-center justify-center shadow-md group-hover:shadow-lg transition-all" style={{ display: 'none' }}>
              <span className="font-bold text-[#0b3d2e] text-lg">AM</span>
            </div>
            <span className="hidden sm:inline font-bold text-white text-lg tracking-tight">Alta Monte</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => goToSection('#transformacion')} className={sectionLink}>La Torre</button>
            <button onClick={() => goToSection('#tecnologia')} className={sectionLink}>Tecnología</button>
            <button onClick={() => goToSection('#impacto')} className={sectionLink}>Impacto</button>

            {/* Dropdown Plataforma */}
            <div className="relative" onMouseEnter={() => setPlatformOpen(true)} onMouseLeave={() => setPlatformOpen(false)}>
              <button className={`flex items-center gap-1 ${['/dashboard','/nodos','/digital-twin'].includes(location.pathname) ? 'text-[#2ecc71]' : 'text-white/70 hover:text-[#2ecc71]'} text-sm font-medium transition-colors`}>
                Plataforma <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {platformOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72">
                  <div className="bg-white rounded-xl shadow-2xl border border-[#2ecc71]/15 p-2">
                    {platform.map((p) => (
                      <Link key={p.to} to={p.to} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F7F4EF] transition-colors">
                        <div className="w-9 h-9 rounded-lg bg-[#2ecc71]/12 flex items-center justify-center flex-shrink-0">
                          <p.icon className="w-4 h-4 text-[#0b3d2e]" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#0b3d2e] text-sm">{p.label}</div>
                          <div className="text-xs text-[#5a7a6a]">{p.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => goToSection('#contacto')} className="bg-[#2ecc71] text-[#0b3d2e] px-5 py-2 rounded-lg font-bold text-sm hover:bg-[#f4d03f] transition-all transform hover:scale-105">
              Conversemos
            </button>
          </div>

          {/* Mobile button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-[#2ecc71]/10 rounded-lg transition-colors">
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-[#0b3d2e] border-b border-[#2ecc71]/20 shadow-lg">
            <div className="px-4 py-4 space-y-1">
              <button onClick={() => goToSection('#transformacion')} className="block w-full text-left text-white/70 hover:text-[#2ecc71] py-2.5">La Torre</button>
              <button onClick={() => goToSection('#tecnologia')} className="block w-full text-left text-white/70 hover:text-[#2ecc71] py-2.5">Tecnología</button>
              <button onClick={() => goToSection('#impacto')} className="block w-full text-left text-white/70 hover:text-[#2ecc71] py-2.5">Impacto</button>

              <div className="py-1"><span className="text-[10px] uppercase tracking-wider text-[#2ecc71]/70 font-bold">Plataforma</span></div>
              {platform.map((p) => (
                <Link key={p.to} to={p.to} className="flex items-center gap-3 text-white/70 hover:text-[#2ecc71] py-2.5 pl-2" onClick={() => setIsOpen(false)}>
                  <p.icon className="w-4 h-4" />{p.label}
                </Link>
              ))}

              <div className="border-t border-white/10 my-2"></div>
              <button onClick={() => goToSection('#contacto')} className="block w-full bg-[#2ecc71] text-[#0b3d2e] px-4 py-2.5 rounded-lg font-bold text-center mt-2">Conversemos</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
