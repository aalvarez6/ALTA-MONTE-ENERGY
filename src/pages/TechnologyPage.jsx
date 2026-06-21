import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Zap, Cpu, Database, Wifi } from 'lucide-react'

const TechnologyPage = () => {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-[#2ecc71] hover:text-[#f4d03f] transition-colors mb-8 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <div className="mb-16">
          <h1 className="text-5xl font-bold text-[#0b3d2e] mb-4">Tecnología de Punta</h1>
          <p className="text-xl text-[#5a7a6a] max-w-3xl">
            La arquitectura técnica completa que hace posible la energía comunitaria inteligente. Cuatro capas integradas que ningun instalador solar convencional ofrece.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-[#0b3d2e] to-[#1f3a5f] rounded-2xl p-8 text-white border border-[#2ecc71]/20">
            <div className="w-12 h-12 bg-[#2ecc71]/20 rounded-lg flex items-center justify-center mb-4">
              <Wifi className="w-6 h-6 text-[#2ecc71]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Capa IoT</h3>
            <p className="text-[#ffffff]/80 mb-4 leading-relaxed">
              Hardware inteligente y conectividad sin WiFi:
            </p>
            <ul className="space-y-2 text-sm text-[#ffffff]/70">
              <li>• ESP32 como controlador central</li>
              <li>• Modbus RS485 para sensores</li>
              <li>• LoRaWAN para comunicación de largo alcance</li>
              <li>• MQTT broker local (edge computing)</li>
              <li>• Medición en tiempo real de voltaje, corriente y temperatura</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#0b3d2e] to-[#1f3a5f] rounded-2xl p-8 text-white border border-[#2ecc71]/20">
            <div className="w-12 h-12 bg-[#2ecc71]/20 rounded-lg flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-[#2ecc71]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Gemelo Digital</h3>
            <p className="text-[#ffffff]/80 mb-4 leading-relaxed">
              Monitoreo visual en tiempo real:
            </p>
            <ul className="space-y-2 text-sm text-[#ffffff]/70">
              <li>• InfluxDB para almacenamiento de series temporales</li>
              <li>• Grafana para visualización interactiva</li>
              <li>• Dashboard en tiempo real (sin latencia)</li>
              <li>• Datos de generación, consumo y batería por nodo</li>
              <li>• API RESTful para integraciones externas</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#0b3d2e] to-[#1f3a5f] rounded-2xl p-8 text-white border border-[#2ecc71]/20">
            <div className="w-12 h-12 bg-[#2ecc71]/20 rounded-lg flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6 text-[#2ecc71]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">IA Predictiva</h3>
            <p className="text-[#ffffff]/80 mb-4 leading-relaxed">
              Machine Learning para optimización:
            </p>
            <ul className="space-y-2 text-sm text-[#ffffff]/70">
              <li>• Pronóstico de demanda horaria</li>
              <li>• Despacho óptimo de batería (carga/descarga)</li>
              <li>• Detección temprana de anomalías</li>
              <li>• Predicción de irradiancia solar</li>
              <li>• Algoritmos entrenados con datos locales</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#0b3d2e] to-[#1f3a5f] rounded-2xl p-8 text-white border border-[#2ecc71]/20">
            <div className="w-12 h-12 bg-[#2ecc71]/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[#2ecc71]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Dashboard + Alertas</h3>
            <p className="text-[#ffffff]/80 mb-4 leading-relaxed">
              Comunicación directa con la comunidad:
            </p>
            <ul className="space-y-2 text-sm text-[#ffffff]/70">
              <li>• Interfaz web responsive para líderes comunitarios</li>
              <li>• Alertas automáticas por WhatsApp</li>
              <li>• Notificaciones de batería llena, cortes, anomalías</li>
              <li>• Visualización de ahorro por hogar</li>
              <li>• Histórico de generación y consumo</li>
            </ul>
          </div>
        </div>

        {/* Architecture Diagram */}
        <div className="bg-[#F7F4EF] rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-[#0b3d2e] mb-8 text-center">Arquitectura del Nodo</h2>
          <div className="bg-white rounded-xl p-8 border border-[#2ecc71]/20">
            <div className="font-mono text-sm text-[#5a7a6a] space-y-4 leading-relaxed">
              <div className="text-center text-lg font-bold text-[#0b3d2e]">COMUNIDAD (Techos)</div>
              <div className="text-center text-[#2ecc71]">↓ Generación Solar</div>
              <div className="text-center font-bold text-[#0b3d2e]">┌─────────────────────────────────┐</div>
              <div className="text-center">│  NODO DER (Controlador Central) │</div>
              <div className="text-center text-sm text-[#5a7a6a]">│  ESP32 + LoRaWAN + MQTT Broker  │</div>
              <div className="text-center font-bold text-[#0b3d2e]">└─────────────────────────────────┘</div>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-[#F7F4EF] rounded-lg border border-[#2ecc71]/20">
                  <div className="font-bold text-[#0b3d2e]">Sensores IoT</div>
                  <div className="text-xs text-[#5a7a6a] mt-2">Voltaje, Corriente, Temperatura, Radiancia</div>
                </div>
                <div className="text-center p-4 bg-[#F7F4EF] rounded-lg border border-[#2ecc71]/20">
                  <div className="font-bold text-[#0b3d2e]">InfluxDB + Grafana</div>
                  <div className="text-xs text-[#5a7a6a] mt-2">Series de tiempo en tiempo real</div>
                </div>
                <div className="text-center p-4 bg-[#F7F4EF] rounded-lg border border-[#2ecc71]/20">
                  <div className="font-bold text-[#0b3d2e]">IA Predictiva</div>
                  <div className="text-xs text-[#5a7a6a] mt-2">Despacho óptimo automático</div>
                </div>
              </div>
              <div className="text-center text-[#2ecc71] mt-6">↓ API + WhatsApp Alerts</div>
              <div className="text-center text-lg font-bold text-[#0b3d2e]">FAMILIAS (Aplicación Móvil)</div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#0b3d2e] mb-8">Preguntas Técnicas Frecuentes</h2>
          <div className="space-y-4">
            <details className="bg-[#F7F4EF] rounded-lg p-6 cursor-pointer group hover:bg-[#f0ebe1] transition-colors">
              <summary className="font-bold text-[#0b3d2e] text-lg flex items-center justify-between">
                ¿Por qué LoRaWAN y no WiFi?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-[#5a7a6a] mt-4 leading-relaxed">
                LoRaWAN funciona sin WiFi, penetra muros de construcción y puede llegar a 10+ km. Ideal para barrios de ladera donde el WiFi es débil o no existe. Además, consume poco ancho de banda.
              </p>
            </details>

            <details className="bg-[#F7F4EF] rounded-lg p-6 cursor-pointer group hover:bg-[#f0ebe1] transition-colors">
              <summary className="font-bold text-[#0b3d2e] text-lg flex items-center justify-between">
                ¿Qué pasa si se corta la energía?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-[#5a7a6a] mt-4 leading-relaxed">
                La batería LFP tiene capacidad de almacenamiento que permite hasta 8 horas de consumo típico. El nodo prioriza cargas críticas (iluminación, refrigeración, comunicación) automáticamente.
              </p>
            </details>

            <details className="bg-[#F7F4EF] rounded-lg p-6 cursor-pointer group hover:bg-[#f0ebe1] transition-colors">
              <summary className="font-bold text-[#0b3d2e] text-lg flex items-center justify-between">
                ¿Es seguro el intercambio de energía entre hogares?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-[#5a7a6a] mt-4 leading-relaxed">
                Sí. El inversor bidireccional está certificado. Todos los equipos cumplen normas RETIE (Colombia) y pasan inspección estatal antes de energizar.
              </p>
            </details>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#2ecc71] rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">¿Tienes dudas técnicas?</h2>
          <p className="mb-6 text-lg">Nuestro equipo de ingenieros está listo para explicar cada detalle.</p>
          <Link to="/contacto" className="inline-flex items-center justify-center gap-2 bg-[#0b3d2e] px-8 py-4 rounded-lg font-bold hover:bg-[#061e14] transition-all">
            Contactar Equipo Técnico
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TechnologyPage
