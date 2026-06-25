import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import './App.css'
import ChatWidget from './ChatWidget'

/* Lazy loading: cada página pesada se descarga solo cuando se visita.
   Esto reduce el peso inicial y acelera la carga del home. */
const DashboardPage    = lazy(() => import('./pages/DashboardPage'))
const NodosPage        = lazy(() => import('./pages/NodosPage'))
const DigitalTwinPage  = lazy(() => import('./pages/DigitalTwinPage'))
const SolarModulePage  = lazy(() => import('./pages/SolarModulePage'))
const TechnologyPage   = lazy(() => import('./pages/TechnologyPage'))
const ImpactPage       = lazy(() => import('./pages/ImpactPage'))
const ContactPage      = lazy(() => import('./pages/ContactPage'))

/* Spinner mientras carga una página */
const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F7F4EF]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-[#2ecc71]/20 border-t-[#2ecc71] rounded-full animate-spin"></div>
      <span className="text-sm text-[#5a7a6a]">Cargando…</span>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Navigation />
        <main className="flex-grow">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/nodos" element={<NodosPage />} />
              <Route path="/digital-twin" element={<DigitalTwinPage />} />
              <Route path="/modulo-solar" element={<SolarModulePage />} />
              <Route path="/tecnologia" element={<TechnologyPage />} />
              <Route path="/impacto" element={<ImpactPage />} />
              <Route path="/contacto" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <ChatWidget />   {/* botón en forma de ave flotante visible en todas las páginas */}
      </div>
    </Router>
  )
}

export default App
