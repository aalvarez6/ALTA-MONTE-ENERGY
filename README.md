# ALTA-MONTE-ENERGY
Propósito fundacional
Democratizar el acceso a energía limpia, autogenerada y distribuida en comunas de estrato 1–2 de Medellín mediante la instalación de sistemas solares comunitarios orquestados por IA, bajo un modelo de **Energía como Servicio (EaaS)** que garantice:
- Reducción de 25–30% en tarifa energética para familias de muy bajos ingresos
- Derecho a recursos energéticos distribuidos sin inversión inicial (FNCER Ley 1715)
- Autonomía comunitaria progresiva: de consumidores a prosumidores
- Creación de empleo técnico local y cadena de valor en energías renovables

Visión 2030
Convertir a Alto Monte en la plataforma líder de orquestación de microgrids urbanas en ciudades intermedias y grandes de LATAM, con presencia en 8 ciudades, 50+ nodos operativos y 100,000+ hogares en comunidades vulnerables beneficiadas.


Capas del sistema

```
┌─────────────────────────────────────────────────────────────┐
│  CAPA DE USUARIO: Dashboard + Copilot (LLM en español)    │
│  • Monitoreo consumo/generación en tiempo real             │
│  • Estimación ahorro mensual + CO₂ evitado                │
│  • Alertas de mantenimiento predictivo                    │
└─────────────────────────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────────────────────────┐
│  CAPA IA/OPTIMIZACIÓN: Multi-Agent System                  │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Agent 1: LSTM Forecasting — 24h solar + demanda        │ │
│ │ Input: radiancia, temp, histórico consumo              │ │
│ │ Output: probabilidad de excedente en horas pico        │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Agent 2: DRL Policy — Despacho óptimo BESS            │ │
│ │ Estado: SOC, precio spot, generación prevista          │ │
│ │ Acción: carga/descarga BESS + exportación a red        │ │
│ │ Reward: maximizar autosuficiencia + ingresos ancilares │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Agent 3: Predictive Maintenance — anomalía en strings  │ │
│ │ Input: curva I-V de paneles, temperatura               │ │
│ │ Output: "riesgo de falla inversor en 7 días"           │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Agent 4: Community Trading — matching P2P               │ │
│ │ Agrega offers/bids de prosumidores → clearing engine   │ │
│ │ Liquidación: blockchain (autenticidad, transparencia)  │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────────────────────────┐
│  CAPA EMS/SCADA: Orquestación en tiempo real               │
│  • Protocolo: IEC 61850 (utilidades) + MQTT (edge)        │
│  • Latencia: <100ms de comando a ejecución               │
│  • Sincronización PMU (Phasor Measurement Units)          │
│  • Islanding automático si falla red distribuidora       │
└─────────────────────────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────────────────────────┐
│  CAPA HARDWARE/IoT: Nodo distribuido                       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Activos en hogar:  [Paneles PV] ← [Inversor] → [BESS]  │ │
│  │ Monitoreo:         [Smart meter] ← [Data logger]        │ │
│  │ Comunicación:      [Gateway LoRaWAN] ← [Sensor temp]    │
│  └─────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Centro comunitario:  [PLC edge] ← [Rel. estabilizador] │ │
│  │ Almacenamiento:      [BESS 40–60 kWh] ← [Recargador]    │
│  │ Interfaz red:        [Inversor bidi] → [Medidor CREG]   │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### 4.2 Componentes clave

**Generación distribuida (Solar PV):**
- Paneles monocristalinos de alta tolerancia a sombra (bifaciales 390W)
- Instalación: 3 modelos según estructura existente
  - *Balastrado sin penetración:* contrapeso sobre losa (95% viviendas)
  - *Espacios comunitarios:* cancha/pasaje (5% nodos)
  - *BIPV integrada:* fachada en viviendas con carga incierta (escalamiento futuro)

**Almacenamiento (BESS):**
- Batería LiFePO₄ 48V, 100 Ah (4.8 kWh) por hogar + central 40 kWh en PLC comunitario
- Inversor bidi (Growatt/Huawei): 3 fases, 10 kW nominal, islanding automático
- BMS integrado + telemetría en tiempo real (SOC, ciclos, temperatura)

**Red de comunicación:**
- LoRaWAN privada (gateway en PLC comunitario) para 50–80 metros
- Fallback 4G/WiFi para nodos distantes
- Protocolo agnostic: Modbus, IEC 62056-21 (lectura de medidores)

**Nodo central (en equipamiento comunitario):**
- PLC industrial (Siemens S7-1200) para lógica de control
- Servidor edge (Jetson Xavier) para inferencia IA local (sin dependencia nube)
- UPS 5 kVA para continuidad operativa ante cortes
