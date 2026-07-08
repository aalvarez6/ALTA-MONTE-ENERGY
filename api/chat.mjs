// ─────────────────────────────────────────────────────────────────────────
//  api/chat.mjs  ·  Alta Monte Energy  ·  Asistente "Alma" (versión experta)
//  Requiere en Vercel: ANTHROPIC_API_KEY = sk-ant-...  (con saldo)
//  Recuerda: tras guardar la variable, hacer REDEPLOY explícito.
// ─────────────────────────────────────────────────────────────────────────

// 📚 BASE DE CONOCIMIENTO — el corazón de la expertise de Alma.
const CONOCIMIENTO = `
=== QUIÉNES SOMOS ===
Alta Monte Energy es una startup ClimateTech de Medellín, Colombia. Instalamos y
operamos NODOS ENERGÉTICOS COMUNITARIOS (solar + batería + IoT + IA) en barrios
de ladera. Proyecto piloto: "La Torre", Comuna 8, Medellín.
Lema: "Energía que nace de la naturaleza, impulsada por la inteligencia."

=== MODELO DE NEGOCIO (EaaS · Energy-as-a-Service) ===
Alta Monte NO vende paneles: opera energía como servicio con impacto verificable.

DOS AUDIENCIAS, DOS PROPUESTAS DE VALOR:

1) EMPRESAS (clientes que pagan · B2B):
   Compañías con estrategias de RSE/ESG/sostenibilidad financian nodos y reciben:
   - Impacto social y ambiental VERIFICABLE para sus reportes ESG/RSE:
     hogares beneficiados y toneladas de CO2 evitadas (métricas ancla).
   - Capa MRV (Monitoreo, Reporte y Verificación) integrada en gemelo digital:
     los datos de impacto salen de sensores reales, no de estimaciones en papel.
   - Ejecución territorial completa: estudio estructural, permisos, instalación,
     operación y relación comunitaria. La empresa no gestiona nada en campo.
   - Visibilidad de marca con licencia social real en las comunidades.
   Diferenciador clave: impacto medible y auditable, no greenwashing.

2) COMUNIDADES (beneficiarias):
   - Acceso a energía solar compartida sin inversión inicial de las familias.
   - Respaldo con batería comunitaria ante cortes del servicio.
   - Visibilidad total: cada familia ve su consumo y ahorro en tiempo real
     (dashboard web y alertas por WhatsApp).
   - Derechos energéticos: reglas claras y transparentes del recurso compartido.
   - Educación: líderes y jóvenes aprenden sobre energía, datos y sostenibilidad.

VENTAJA COMPETITIVA (moat): no es el hardware solar (commodity), es:
   (a) dataset territorial propio de consumo en barrios de ladera,
   (b) capa MRV integrada que hace el impacto auditable,
   (c) confianza comunitaria construida en territorio.

=== TECNOLOGÍA ===
- Capa IoT: ESP32 + Modbus RS48
