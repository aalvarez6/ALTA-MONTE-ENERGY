import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import FlyingBirds from '../components/FlyingBirds'
import './HomePage.css'

/* Rutas de imágenes — todas en public/AM_Imagenes/ */
const IMG = {
  hero:        '/AM_Imagenes/Background.png',
  heroFallback:'/AM_Imagenes/AM_Background_placeholder.svg',
  logo:        '/AM_Imagenes/Logo_White(2)',
  antes:       '/AM_Imagenes/Altos_de_la_torre_M. Espinosa_1.jpg',
  despues:     '/AM_Imagenes/Altos de la torre_paneles_IA1.png',
  antes_det:   '/AM_Imagenes/Altos_de_la_torre_Decierto_Cediento_3.png',
  despues_det: '/AM_Imagenes/Altos_de_la_torre_paneles_GenIA_3.png'
}

const HomePage = () => {
  const [heroBg, setHeroBg] = useState(IMG.hero)
  const barsRef = useRef(null)

  /* Detecta si Background.png carga; si no, usa el placeholder */
  useEffect(() => {
    const test = new Image()
    test.src = IMG.hero
    test.onerror = () => setHeroBg(IMG.heroFallback)
  }, [])

  /* Barras animadas del mini-dashboard (réplica del HTML) */
  useEffect(() => {
    const bEl = barsRef.current
    if (!bEl) return
    bEl.innerHTML = ''
    const heights = [22,34,28,50,44,60,54,70,64,76,68,82,74,66,79,62,56,48,63,72,66,59,52,45]
    heights.forEach((v, i) => {
      const b = document.createElement('div')
      b.className = 'bar' + (i === heights.length - 1 ? ' hi' : '')
      b.style.height = v + '%'
      bEl.appendChild(b)
    })
    let activeIdx = heights.length - 1
    const id = setInterval(() => {
      const bars = bEl.querySelectorAll('.bar')
      if (!bars.length) return
      bars.forEach(b => b.classList.remove('hi'))
      activeIdx = (activeIdx + 1) % bars.length
      bars[activeIdx].classList.add('hi')
    }, 1100)
    return () => clearInterval(id)
  }, [])

  /* Formulario de contacto → abre correo */
  const [formOk, setFormOk] = useState(false)
  const sendForm = () => {
    const nombre = document.getElementById('f-nombre').value.trim()
    const email = document.getElementById('f-email').value.trim()
    const tipo = document.getElementById('f-tipo').value
    const msg = document.getElementById('f-msg').value.trim()
    if (!nombre || !email) { alert('Por favor completa nombre y correo electrónico.'); return }
    if (!email.includes('@')) { alert('Por favor ingresa un correo válido.'); return }
    setFormOk(true)
    const subject = encodeURIComponent(`Consulta Alta Monte Energy: ${tipo || 'General'}`)
    const body = encodeURIComponent(`Nombre: ${nombre}\nCorreo: ${email}\n\n${msg}`)
    window.location.href = `mailto:altamonteenergy@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="amhome">
      {/* ═══════════ HERO ═══════════ */}
      <section className="hero" style={{ backgroundImage: `url('${heroBg}')` }}>
        <div className="hero-ov"></div>
        <FlyingBirds />
        <div className="hero-cnt">
          <div className="kicker">Nodos Energéticos Comunitarios · Medellín</div>
          <h1>Energía que nace<br />de la naturaleza,<br /><em>impulsada por<br />la inteligencia.</em></h1>
          <p className="hero-sub">Transformamos barrios de ladera en ecosistemas energéticos inteligentes. Solar distribuido + Gemelos Digitales + IA para comunidades resilientes.</p>
          <div className="btns">
            <a href="#transformacion" className="btn-p">Ver La Torre ↓</a>
            <Link to="/dashboard" className="btn-g">Ver plataforma</Link>
          </div>
          <div className="hero-chips">
            <span className="hchip"><span className="hchip-icon">☀</span> Solar distribuido</span>
            <span className="hchip"><span className="hchip-icon">🔮</span> Gemelo digital</span>
            <span className="hchip"><span className="hchip-icon">🤖</span> IA predictiva</span>
            <span className="hchip"><span className="hchip-icon">🏘️</span> Impacto comunitario</span>
          </div>
        </div>
        <div className="scroll-hint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ═══════════ ANTES & DESPUÉS ═══════════ */}
      <section className="section white" id="transformacion">
        <div className="sec-hdr">
          <div className="sk center">La Torre · Comuna 8 · Medellín</div>
          <h2>El antes y el después<br />de un nodo</h2>
          <p className="sub" style={{ margin: '12px auto 0', textAlign: 'center' }}>
            El mismo barrio. La misma ladera. La misma comunidad.<br />Una diferencia: inteligencia energética distribuida.
          </p>
        </div>

        <div className="ba-grid">
          <div className="ba-panel">
            <img src={IMG.antes} alt="La Torre antes de Alta Monte Energy" loading="lazy" />
            <div className="ba-label">Antes</div>
            <div className="ba-caption">
              <strong>Sin nodo energético</strong>
              <p>Dependiente de la red · Sin visibilidad de consumo · Sin respaldo ante cortes</p>
            </div>
          </div>
          <div className="ba-panel">
            <img src={IMG.despues} alt="La Torre con Alta Monte Energy activo" loading="lazy" />
            <div className="ba-label after">Después · Nodo activo</div>
            <div className="ba-caption">
              <strong>Alta Monte Energy instalado</strong>
              <p>Solar distribuido · Batería comunitaria · Gemelo digital activo</p>
            </div>
          </div>
        </div>

        <div className="ba-grid" style={{ marginTop: 4 }}>
          <div className="ba-panel">
            <img src={IMG.antes_det} alt="Techos sin paneles solares" loading="lazy" />
            <div className="ba-label">Antes · Detalle techos</div>
            <div className="ba-caption">
              <strong>Techos sin aprovechar</strong>
              <p>Superficie disponible que no genera energía para la comunidad</p>
            </div>
          </div>
          <div className="ba-panel">
            <img src={IMG.despues_det} alt="Techos con paneles solares comunitarios" loading="lazy" />
            <div className="ba-label after">Después · Nodo solar</div>
            <div className="ba-caption">
              <strong>Techos que producen energía</strong>
              <p>Cada cubierta se convierte en parte del nodo solar compartido</p>
            </div>
          </div>
        </div>

        <div className="trans-strip">
          <div className="trans-item"><span className="trans-from">Sin generación propia</span><span className="trans-arrow">→</span><span className="trans-to">Energía solar compartida</span></div>
          <div className="trans-item"><span className="trans-from">Sin visibilidad</span><span className="trans-arrow">→</span><span className="trans-to">Datos en tiempo real</span></div>
          <div className="trans-item"><span className="trans-from">Sin respaldo en cortes</span><span className="trans-arrow">→</span><span className="trans-to">Batería comunitaria</span></div>
          <div className="trans-item"><span className="trans-from">Dependencia total</span><span className="trans-arrow">→</span><span className="trans-to">Resiliencia energética</span></div>
        </div>
      </section>

      {/* ═══════════ PILARES ═══════════ */}
      <section className="section light" id="nodos">
        <div className="sk">El nodo DER</div>
        <h2>Un sistema vivo<br />en cada comunidad</h2>
        <p className="sub">No instalamos paneles. Construimos nodos inteligentes que aprenden, optimizan y empoderan a cada familia.</p>
        <div className="pilares">
          <div className="pilar"><span className="p-icon">☀</span><h4>Generación solar</h4><p>Paneles + batería LFP comunitaria, validada con estudios estructurales previos en cada edificio.</p></div>
          <div className="pilar"><span className="p-icon">⚡</span><h4>Optimización 24/7</h4><p>El nodo decide cuándo cargar, usar o compartir. Despacho óptimo con IA que cuida la factura.</p></div>
          <div className="pilar"><span className="p-icon">🔧</span><h4>Mantenimiento predictivo</h4><p>El gemelo digital detecta fallas antes de que ocurran. Alertas automáticas al técnico responsable.</p></div>
          <div className="pilar"><span className="p-icon">👥</span><h4>Derechos energéticos</h4><p>Cada familia ve su consumo y su derecho al recurso compartido en tiempo real, sin intermediarios.</p></div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/nodos" className="btn-p">Explorar todos los nodos →</Link>
        </div>
      </section>

      {/* ═══════════ TECNOLOGÍA ═══════════ */}
      <section className="section dark" id="tecnologia">
        <div className="sk inv">Stack tecnológico</div>
        <h2 className="inv">Tecnología de punta,<br />arraigada en la ladera.</h2>
        <p className="sub inv">Cuatro capas integradas que ningún instalador solar convencional ofrece.</p>
        <div className="tech-grid">
          <div className="tc"><span className="tc-i">🔌</span><div className="tc-t">Capa IoT</div><div className="tc-d">ESP32 + Modbus RS485 · LoRaWAN sin WiFi · MQTT broker local · Edge computing en nodo.</div></div>
          <div className="tc"><span className="tc-i">🔮</span><div className="tc-t">Gemelo digital</div><div className="tc-d">InfluxDB + Grafana · Modelo en tiempo real de consumo, generación y batería por nodo.</div></div>
          <div className="tc"><span className="tc-i">🤖</span><div className="tc-t">IA predictiva</div><div className="tc-d">Pronóstico de demanda, despacho óptimo y detección temprana de anomalías.</div></div>
          <div className="tc"><span className="tc-i">📲</span><div className="tc-t">Dashboard + alertas</div><div className="tc-d">API + frontend web · Alertas de ahorro y estado por WhatsApp para cada hogar.</div></div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/tecnologia" className="btn-p">Ver tecnología en detalle →</Link>
        </div>
      </section>

      {/* ═══════════ DASHBOARD (mini, ilustrativo) ═══════════ */}
      <div className="db-wrap" style={{ backgroundImage: `url('${heroBg}')` }}>
        <div className="db-ov"></div>
        <div className="db-inner">
          <div>
            <div className="sk inv">Gemelo digital</div>
            <h2 className="inv">Cada nodo, visible<br />en tiempo real.</h2>
            <p className="sub inv">Líderes comunitarios y hogares acceden a sus datos sin necesitar conocimiento técnico.</p>
            <div className="db-feats">
              <div className="db-f"><div className="df-i">📈</div><div className="df-t"><h4>Generación vs consumo</h4><p>Curvas en tiempo real por nodo y por hogar, hora a hora.</p></div></div>
              <div className="db-f"><div className="df-i">💰</div><div className="df-t"><h4>Ahorro de la comunidad</h4><p>Cuánto aporta cada familia y el nodo, de forma transparente y verificable.</p></div></div>
              <div className="db-f"><div className="df-i">🔔</div><div className="df-t"><h4>Alertas WhatsApp</h4><p>Batería llena, consumo inusual o falla — mensaje directo a cada familia.</p></div></div>
            </div>
            <div style={{ marginTop: 28 }}>
              <Link to="/dashboard" className="btn-p">Abrir dashboard completo →</Link>
            </div>
          </div>
          <div className="db-card">
            <div className="db-hdr">
              <span className="db-t">Nodo — La Torre · C8</span>
              <span className="live"><span className="ld"></span>LIVE</span>
            </div>
            <div className="kpi-g">
              <div className="kpi"><div className="ku">Generación</div><div className="kv">Solar activa</div><div className="kc">en línea</div></div>
              <div className="kpi"><div className="ku">Consumo</div><div className="kv">Optimizado</div><div className="kc">eficiente</div></div>
              <div className="kpi"><div className="ku">Batería</div><div className="kv">Cargando</div><div className="kc">saludable</div></div>
              <div className="kpi"><div className="ku">Excedente</div><div className="kv">A la red</div><div className="kc">compartiendo</div></div>
            </div>
            <div className="bars-wrap">
              <div className="bars" ref={barsRef}></div>
              <div className="bars-cap">Actividad del nodo · representación ilustrativa</div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ IMPACTO ═══════════ */}
      <section className="section darkest" id="impacto">
        <div className="sk inv center">Impacto del proyecto</div>
        <h2 className="inv" style={{ textAlign: 'center' }}>Energía que transforma<br />comunidades</h2>
        <p className="sub inv" style={{ margin: '0 auto 52px', textAlign: 'center' }}>Cada nodo piloto abre la puerta a una plataforma escalable en toda LATAM.</p>
        <div className="imp-g">
          <div className="imp-c"><div className="imp-ic">🔋</div><div className="imp-t">Menor dependencia</div><div className="imp-l">La energía solar compartida alivia la carga de la red convencional para toda la comunidad.</div></div>
          <div className="imp-c"><div className="imp-ic">🛡️</div><div className="imp-t">Resiliencia</div><div className="imp-l">Respaldo comunitario ante cortes e interrupciones del servicio eléctrico.</div></div>
          <div className="imp-c"><div className="imp-ic">🏘️</div><div className="imp-t">Hecho para la ladera</div><div className="imp-l">Diseñado específicamente para los barrios de ladera de Medellín y su realidad.</div></div>
          <div className="imp-c"><div className="imp-ic">👁️</div><div className="imp-t">Transparencia</div><div className="imp-l">Cada kilovatio visible y compartido con toda la comunidad en tiempo real.</div></div>
        </div>
        <div className="roadmap">
          <div className="rm"><div className="rm-d done">✓</div><div className="rm-t">MVP Digital</div><div className="rm-i">Landing · API · Dashboard</div></div>
          <div className="rm"><div className="rm-d now">⚡</div><div className="rm-t">Nodo Piloto</div><div className="rm-i">La Torre · IoT real</div></div>
          <div className="rm"><div className="rm-d nxt">🤖</div><div className="rm-t">IA Real</div><div className="rm-i">Pronóstico · Despacho óptimo</div></div>
          <div className="rm"><div className="rm-d nxt">🌎</div><div className="rm-t">Escala</div><div className="rm-i">Más comunidades · LATAM</div></div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 52 }}>
          <Link to="/impacto" className="btn-p">Ver impacto y ODS →</Link>
        </div>
      </section>

      {/* ═══════════ CARTA ═══════════ */}
      <section className="carta-out">
        <div className="carta-inner">
          <div className="sk">Propósito y misión</div>
          <h2>¿Quiénes somos?</h2>
          <p className="sub">Una iniciativa de impacto real que combina tecnología, comunidad e inteligencia para transformar la energía en Medellín.</p>
          <div className="carta">
            <div className="cl">
              <div className="cl-hd"><span>🌿</span> Nuestro propósito</div>
              <p className="cl-b">Impulsar la transición energética en las alturas de Medellín, combinando tecnología, inteligencia y comunidad para un futuro más justo y sostenible.</p>
              <div className="cl-hd"><span>⚙</span> Lo que hacemos</div>
              <p className="cl-b">Instalamos y operamos nodos energéticos comunitarios, modelamos barrios con gemelos digitales y optimizamos la energía con inteligencia artificial.</p>
              <div className="cl-hd"><span>🌱</span> Nuestro impacto</div>
              <ul className="cl-ul">
                <li>Energía limpia y accesible</li>
                <li>Resiliencia climática comunitaria</li>
                <li>Desarrollo social y económico</li>
                <li>Innovación con propósito real</li>
              </ul>
            </div>
            <div className="cm" style={{ backgroundImage: `url('${heroBg}')` }}>
              <div className="cm-ov"></div>
              <div className="cm-cnt">
                <div className="cm-kk">Nodos en acción</div>
                <p className="cm-intro">Cada nodo es más que energía:<br />es conexión, educación,<br />oportunidad y futuro.</p>
                <div className="nb"><div className="nb-i">☀</div><div className="nb-t"><strong>Generación solar</strong>Paneles + batería comunitaria compartida</div></div>
                <div className="nb"><div className="nb-i">🤖</div><div className="nb-t"><strong>Inteligencia artificial</strong>Optimización y predicción 24/7</div></div>
                <div className="nb"><div className="nb-i">📊</div><div className="nb-t"><strong>Gemelo digital</strong>Monitoreo en tiempo real</div></div>
                <div className="nb"><div className="nb-i">👥</div><div className="nb-t"><strong>Impacto comunitario</strong>Derechos energéticos distribuidos</div></div>
              </div>
            </div>
            <div className="cr">
              <img src={IMG.logo} alt="Alta Monte Energy" className="cr-logo" onError={(e) => { e.target.style.display = 'none' }} />
              <p className="cr-quote">"La energía que nace de la naturaleza, impulsada por la inteligencia, transforma comunidades."</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACTO ═══════════ */}
      <section className="section white" id="contacto">
        <div className="contacto-wrap">
          <div className="form-info">
            <div className="sk">Conversemos</div>
            <h2>¿Tienes un proyecto<br />o quieres unirte?</h2>
            <p>Cuéntanos sobre tu comunidad, tu barrio o tu idea. Respondemos en menos de 24 horas.</p>
            <div className="fci-list">
              <div className="fci"><div className="fci-icon">✉</div><div><div className="fci-label">Email</div><a href="mailto:altamonteenergy@gmail.com" className="fci-val">altamonteenergy@gmail.com</a></div></div>
              <div className="fci"><div className="fci-icon">📞</div><div><div className="fci-label">WhatsApp</div><a href="https://wa.me/573045886447" target="_blank" rel="noopener noreferrer" className="fci-val">+57 304 588 6447</a></div></div>
              <div className="fci"><div className="fci-icon">📍</div><div><div className="fci-label">Ubicación</div><span className="fci-val">Medellín, Colombia</span></div></div>
              <div className="fci"><div className="fci-icon">🕐</div><div><div className="fci-label">Tiempo de respuesta</div><span className="fci-val">Menos de 24 horas</span></div></div>
            </div>
          </div>
          <div>
            <div className="form-fields">
              <div className="form-row">
                <div className="f-group"><label htmlFor="f-nombre">Nombre completo</label><input type="text" id="f-nombre" placeholder="Tu nombre" autoComplete="name" /></div>
                <div className="f-group"><label htmlFor="f-email">Correo electrónico</label><input type="email" id="f-email" placeholder="tu@correo.com" autoComplete="email" /></div>
              </div>
              <div className="form-row">
                <div className="f-group"><label htmlFor="f-tel">Teléfono / WhatsApp</label><input type="tel" id="f-tel" placeholder="+57 300 000 0000" autoComplete="tel" /></div>
                <div className="f-group"><label htmlFor="f-tipo">Tipo de consulta</label>
                  <select id="f-tipo">
                    <option value="">Selecciona...</option>
                    <option>Instalar un nodo en mi comunidad</option>
                    <option>Alianza institucional</option>
                    <option>Inversión / financiamiento</option>
                    <option>Prensa / medios</option>
                    <option>Otro</option>
                  </select>
                </div>
              </div>
              <div className="f-group"><label htmlFor="f-msg">Tu mensaje</label><textarea id="f-msg" placeholder="¿En qué barrio estás? ¿Cuántas familias? ¿Qué problema quieres resolver?"></textarea></div>
              <button className="form-submit" onClick={sendForm}>Enviar mensaje ↗</button>
              {formOk && <div className="form-success" style={{ display: 'block' }}>✅ ¡Mensaje enviado! Te contactaremos en menos de 24 horas.</div>}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ ODS ═══════════ */}
      <section className="section light" id="ods">
        <div className="sec-hdr">
          <div className="sk center">Compromisos globales</div>
          <h2>Objetivos de Desarrollo<br />Sostenible que cumplimos</h2>
          <p className="sub" style={{ margin: '12px auto 0', textAlign: 'center' }}>
            Alta Monte Energy no es solo un negocio de energía — es una plataforma de impacto alineada con la Agenda 2030 de la ONU.
          </p>
        </div>
        <div className="ods-grid">
          <div className="ods-card">
            <div className="ods-color" style={{ background: '#FCC30B' }}></div>
            <div className="ods-body">
              <div className="ods-badge" style={{ background: '#FCC30B' }}>
                <svg viewBox="0 0 60 60" width="32" height="32">
                  <circle cx="30" cy="30" r="9" fill="white" />
                  <line x1="30" y1="5" x2="30" y2="14" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  <line x1="30" y1="46" x2="30" y2="55" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  <line x1="5" y1="30" x2="14" y2="30" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  <line x1="46" y1="30" x2="55" y2="30" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  <line x1="12" y1="12" x2="19" y2="19" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  <line x1="41" y1="41" x2="48" y2="48" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  <line x1="48" y1="12" x2="41" y2="19" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  <line x1="19" y1="41" x2="12" y2="48" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <div className="ods-num" style={{ color: '#FCC30B' }}>ODS 7</div>
              <div className="ods-title">Energía asequible<br />y no contaminante</div>
              <div className="ods-desc">Garantizamos acceso a energía limpia, confiable y moderna para comunidades de ladera que hoy dependen de la red convencional.</div>
              <span className="ods-tag" style={{ background: '#FFF8E0', color: '#8a6800' }}>Impacto directo</span>
            </div>
          </div>

          <div className="ods-card">
            <div className="ods-color" style={{ background: '#DD1367' }}></div>
            <div className="ods-body">
              <div className="ods-badge" style={{ background: '#DD1367' }}>
                <svg viewBox="0 0 60 60" width="32" height="32">
                  <circle cx="20" cy="20" r="8" fill="white" />
                  <circle cx="40" cy="20" r="8" fill="white" />
                  <path d="M5 50 Q5 36 20 36 L40 36 Q55 36 55 50" fill="white" />
                </svg>
              </div>
              <div className="ods-num" style={{ color: '#DD1367' }}>ODS 10</div>
              <div className="ods-title">Reducción de<br />las desigualdades</div>
              <div className="ods-desc">Llevamos tecnología de punta a comunidades que históricamente quedaron fuera del acceso a recursos energéticos y digitales.</div>
              <span className="ods-tag" style={{ background: '#FDEEF4', color: '#8a004a' }}>Impacto directo</span>
            </div>
          </div>

          <div className="ods-card">
            <div className="ods-color" style={{ background: '#FD9D24' }}></div>
            <div className="ods-body">
              <div className="ods-badge" style={{ background: '#FD9D24' }}>
                <svg viewBox="0 0 60 60" width="32" height="32">
                  <rect x="10" y="28" width="12" height="20" rx="2" fill="white" />
                  <rect x="24" y="20" width="12" height="28" rx="2" fill="white" />
                  <rect x="38" y="33" width="12" height="15" rx="2" fill="white" />
                  <polyline points="6,30 16,18 30,22 44,12 54,20" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="ods-num" style={{ color: '#FD9D24' }}>ODS 11</div>
              <div className="ods-title">Ciudades y comunidades<br />sostenibles</div>
              <div className="ods-desc">Transformamos barrios de ladera en comunidades resilientes, con infraestructura energética inteligente y participación ciudadana.</div>
              <span className="ods-tag" style={{ background: '#FFF3E8', color: '#8a4400' }}>Impacto directo</span>
            </div>
          </div>

          <div className="ods-card">
            <div className="ods-color" style={{ background: '#3F7E44' }}></div>
            <div className="ods-body">
              <div className="ods-badge" style={{ background: '#3F7E44' }}>
                <svg viewBox="0 0 60 60" width="32" height="32">
                  <path d="M30 8 L52 46 H8 Z" fill="none" stroke="white" strokeWidth="4" strokeLinejoin="round" />
                  <line x1="30" y1="20" x2="30" y2="34" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="30" cy="40" r="3" fill="white" />
                </svg>
              </div>
              <div className="ods-num" style={{ color: '#3F7E44' }}>ODS 13</div>
              <div className="ods-title">Acción por<br />el clima</div>
              <div className="ods-desc">Cada nodo reduce emisiones desplazando generación termoeléctrica y construye resiliencia climática donde más se necesita.</div>
              <span className="ods-tag" style={{ background: '#EDF7ED', color: '#1a4a1a' }}>Impacto directo</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
