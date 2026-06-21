import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const ImpactPage = () => {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-[#2ecc71] hover:text-[#f4d03f] transition-colors mb-8 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <div className="mb-16">
          <h1 className="text-5xl font-bold text-[#0b3d2e] mb-4">Impacto Social y Ambiental</h1>
          <p className="text-xl text-[#5a7a6a] max-w-3xl">
            Cada nodo piloto abre la puerta a una plataforma escalable en toda Latinoamérica. Cumplimos cuatro Objetivos de Desarrollo Sostenible (ODS 2030) de la ONU.
          </p>
        </div>

        {/* ODS Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 border-l-8 border-[#FCC30B]">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-[#FCC30B]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">⚡</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0b3d2e]">ODS 7</h3>
                <p className="text-[#5a7a6a] text-sm">Energía asequible y no contaminante</p>
              </div>
            </div>
            <p className="text-[#5a7a6a] leading-relaxed mb-4">
              Garantizamos acceso a energía limpia, confiable y moderna para comunidades de ladera que hoy dependen exclusivamente de la red termoeléctrica convencional.
            </p>
            <div className="bg-[#FFF8E0] rounded-lg p-4 text-sm text-[#8a6800]">
              <strong>Métrica:</strong> Energía solar generada y distribuida por nodo comunitario
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border-l-8 border-[#DD1367]">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-[#DD1367]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">🤝</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0b3d2e]">ODS 10</h3>
                <p className="text-[#5a7a6a] text-sm">Reducción de las desigualdades</p>
              </div>
            </div>
            <p className="text-[#5a7a6a] leading-relaxed mb-4">
              Llevamos tecnología de punta a comunidades que históricamente quedaron fuera del acceso a recursos energéticos digitales. Empoderamos líderes comunitarios.
            </p>
            <div className="bg-[#FDEEF4] rounded-lg p-4 text-sm text-[#8a004a]">
              <strong>Métrica:</strong> Familias conectadas, líderes capacitados
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border-l-8 border-[#FD9D24]">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-[#FD9D24]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">🏘️</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0b3d2e]">ODS 11</h3>
                <p className="text-[#5a7a6a] text-sm">Ciudades y comunidades sostenibles</p>
              </div>
            </div>
            <p className="text-[#5a7a6a] leading-relaxed mb-4">
              Transformamos barrios de ladera en comunidades resilientes, con infraestructura energética inteligente, participación ciudadana y modelos económicos justos.
            </p>
            <div className="bg-[#FFF3E8] rounded-lg p-4 text-sm text-[#8a4400]">
              <strong>Métrica:</strong> Resiliencia energética comunitaria
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border-l-8 border-[#3F7E44]">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-[#3F7E44]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">🌍</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0b3d2e]">ODS 13</h3>
                <p className="text-[#5a7a6a] text-sm">Acción por el clima</p>
              </div>
            </div>
            <p className="text-[#5a7a6a] leading-relaxed mb-4">
              Cada nodo reduce emisiones desplazando generación termoeléctrica (carbón, gas). Construimos resiliencia climática donde más se necesita: en zonas vulnerables.
            </p>
            <div className="bg-[#EDF7ED] rounded-lg p-4 text-sm text-[#1a4a1a]">
              <strong>Métrica:</strong> Toneladas de CO₂ evitadas por año
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-[#F7F4EF] rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-[#0b3d2e] mb-8 text-center">Beneficios Directos para la Comunidad</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="text-4xl mb-3">🔋</div>
              <h3 className="font-bold text-[#0b3d2e] mb-2">Menor dependencia</h3>
              <p className="text-[#5a7a6a] text-sm">La energía solar compartida alivia la carga de la red convencional para toda la comunidad.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="font-bold text-[#0b3d2e] mb-2">Resiliencia</h3>
              <p className="text-[#5a7a6a] text-sm">Respaldo comunitario ante cortes e interrupciones del servicio eléctrico.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-bold text-[#0b3d2e] mb-2">Ahorro verificable</h3>
              <p className="text-[#5a7a6a] text-sm">Cada familia ve su consumo y ahorro en tiempo real. Transparencia total.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-bold text-[#0b3d2e] mb-2">Educación digital</h3>
              <p className="text-[#5a7a6a] text-sm">Líderes y jóvenes aprenden IoT, datos y sostenibilidad.</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#0b3d2e] mb-8 text-center">Hoja de Ruta 2026–2028</h2>
          <div className="space-y-6">
            <div className="flex gap-6 md:gap-12">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#2ecc71] text-white rounded-full flex items-center justify-center font-bold mb-4">✓</div>
                <div className="w-1 flex-grow bg-[#2ecc71]/20"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold text-[#0b3d2e] mb-2">MVP Digital (Completado)</h3>
                <p className="text-[#5a7a6a]">Landing page, API, Dashboard básico</p>
              </div>
            </div>

            <div className="flex gap-6 md:gap-12">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#f4d03f] text-[#0b3d2e] rounded-full flex items-center justify-center font-bold mb-4 shadow-lg">⚡</div>
                <div className="w-1 flex-grow bg-[#f4d03f]/20"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold text-[#0b3d2e] mb-2">Nodo Piloto (En Progreso)</h3>
                <p className="text-[#5a7a6a]">La Torre, Comuna 8. IoT real, instalación de paneles, batería LFP, primeros usuarios.</p>
              </div>
            </div>

            <div className="flex gap-6 md:gap-12">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#ffffff] border-2 border-[#0b3d2e] text-[#0b3d2e] rounded-full flex items-center justify-center font-bold mb-4">🤖</div>
                <div className="w-1 flex-grow bg-[#0b3d2e]/10"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold text-[#0b3d2e] mb-2">IA Real (Q2 2027)</h3>
                <p className="text-[#5a7a6a]">Pronóstico de demanda, despacho óptimo automático, detección de anomalías.</p>
              </div>
            </div>

            <div className="flex gap-6 md:gap-12">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#ffffff] border-2 border-[#0b3d2e] text-[#0b3d2e] rounded-full flex items-center justify-center font-bold mb-4">🌎</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0b3d2e] mb-2">Escala en LATAM (2028+)</h3>
                <p className="text-[#5a7a6a]">Más comunidades en Medellín, otras ciudades colombianas, y expansión regional.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#0b3d2e] to-[#1f3a5f] rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Sé parte del cambio</h2>
          <p className="mb-6 text-lg max-w-2xl mx-auto">
            Ya sea como aliado, inversor, beneficiario o defensor de la sostenibilidad, tu rol es clave para transformar barrios de ladera.
          </p>
          <Link to="/contacto" className="inline-flex items-center justify-center gap-2 bg-[#2ecc71] text-[#0b3d2e] px-8 py-4 rounded-lg font-bold hover:bg-[#f4d03f] transition-all">
            Contactar Ahora
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ImpactPage
