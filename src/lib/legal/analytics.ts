import type { Language } from "@/lib/content";

/*
 * The analytics notice: what the optional analytics in Allfit Space and Allfit Studio
 * may measure and what it never collects. Its effective date lives in
 * `legalEffectiveDates`; the products record consent against the internal version id
 * «analytics-v1», which the page does not show. The privacy policy links here.
 */
export const analyticsNotice = {
  es: {
    metaTitle: "Aviso de analítica | Allfit One",
    metaDescription:
      "Cómo funciona la analítica opcional de Allfit One, qué datos permitimos, qué datos prohibimos y cómo retirar el consentimiento.",
    title: "Lo que medimos. Lo que nunca tocamos.",
    lead:
      "La analítica de Allfit One es opcional. Nos ayuda a detectar fallos y entender el rendimiento sin leer tu contenido ni convertir tu actividad física en un perfil.",
    sections: [
      ["#purpose", "Para qué la usamos"],
      ["#data-boundary", "La frontera de datos"],
      ["#provider", "Proveedor y entorno"],
      ["#retention", "Retención"],
      ["#control", "Tus controles"],
    ],
    purposeTitle: "Para qué la usamos",
    purposeBody:
      "Medimos si una pantalla carga, si una operación termina correctamente y cuánto tarda. También usamos señales agregadas para mantener disponibles la API y los procesos de segundo plano. No usamos esta información para publicidad, decisiones sobre salud ni perfiles comerciales.",
    boundaryTitle: "La frontera de datos",
    boundaryLead:
      "Cada evento pasa por una lista cerrada. Si contiene una propiedad no permitida, no sale de Allfit One.",
    allowedTitle: "Podemos medir",
    allowedItems: [
      "La categoría de pantalla y el paso general de un flujo.",
      "El nombre técnico de una operación, su resultado y el grupo de estado HTTP.",
      "Duraciones, Web Vitals y tiempos agregados de dependencias.",
      "El entorno, la versión de la aplicación, la plataforma y el servicio.",
      "Resultados agregados de jobs y señales operativas de fallos.",
    ],
    prohibitedTitle: "Nunca recopilamos",
    prohibitedItems: [
      "Nombres, correos, teléfonos ni identificadores de cuentas, personas u organizaciones.",
      "URL completas, parámetros, cuerpos de peticiones o respuestas y texto escrito por usuarios.",
      "Contraseñas, tokens, cookies, direcciones IP ni identificadores del dispositivo.",
      "Datos de salud, nutrición, medidas corporales, sesiones de entrenamiento o marcas personales.",
      "Grabaciones de sesión, autocaptura, mapas de calor, encuestas o eventos automáticos del SDK.",
    ],
    pseudonymTitle: "Un seudónimo, no tu identidad",
    pseudonymBody:
      "Cuando aceptas, la API genera un identificador seudónimo mediante una clave protegida. PostHog no recibe el identificador de tu proveedor de acceso y Allfit One no crea perfiles personales en el proveedor de analítica.",
    providerTitle: "Proveedor y entorno",
    providerBody:
      "Los eventos permitidos se procesan en PostHog US. La analítica está deshabilitada en desarrollo y preview. En producción requiere, al mismo tiempo, tu consentimiento y un gate remoto activo para el producto que usas.",
    providerFacts: [
      ["Procesador", "PostHog US"],
      ["Perfiles personales", "Deshabilitados"],
    ],
    retentionTitle: "Retención limitada",
    retentionItems: [
      ["Analítica de producto", "Hasta 90 días"],
      ["Logs operativos", "Hasta 30 días"],
    ],
    retentionBody:
      "Al terminar cada periodo, los datos deben eliminarse o agregarse de forma que ya no permitan seguir un seudónimo individual.",
    controlTitle: "Tú mantienes el control",
    controlItems: [
      ["Antes de aceptar", "No cargamos el SDK, no consultamos el gate y no enviamos eventos."],
      ["Cuando retiras el permiso", "La captura se detiene y los eventos ocurridos mientras está apagada se descartan."],
      ["Señales de privacidad", "Global Privacy Control y Do Not Track mantienen la analítica desactivada en la web."],
    ],
    deletionTitle: "Retiro y eliminación",
    deletionBody:
      "Puedes cambiar tu decisión desde el control Privacidad de Allfit Studio o Allfit Space. Para solicitar la eliminación de la información asociada a tu seudónimo, escríbenos. Verificaremos la solicitud sin pedirte que publiques datos sensibles.",
    contact: "Solicitar ayuda de privacidad",
  },
  en: {
    metaTitle: "Analytics notice | Allfit One",
    metaDescription:
      "How optional Allfit One analytics works, which data is allowed, which data is prohibited, and how to withdraw consent.",
    title: "What we measure. What we never touch.",
    lead:
      "Allfit One analytics is optional. It helps us find failures and understand performance without reading your content or turning your fitness activity into a profile.",
    sections: [
      ["#purpose", "Why we use it"],
      ["#data-boundary", "The data boundary"],
      ["#provider", "Provider and environment"],
      ["#retention", "Retention"],
      ["#control", "Your controls"],
    ],
    purposeTitle: "Why we use it",
    purposeBody:
      "We measure whether a screen loads, whether an operation completes, and how long it takes. We also use aggregate signals to keep the API and background processes available. We do not use this information for advertising, health decisions, or commercial profiles.",
    boundaryTitle: "The data boundary",
    boundaryLead:
      "Every event passes through a closed allowlist. If it contains a property that is not permitted, it does not leave Allfit One.",
    allowedTitle: "We may measure",
    allowedItems: [
      "The screen category and the general step in a flow.",
      "The technical operation name, its outcome, and its HTTP status group.",
      "Durations, Web Vitals, and aggregate dependency timing.",
      "The environment, application release, platform, and service.",
      "Aggregate job outcomes and operational failure signals.",
    ],
    prohibitedTitle: "We never collect",
    prohibitedItems: [
      "Names, emails, phone numbers, or account, person, and organization identifiers.",
      "Full URLs, parameters, request or response bodies, and user-entered text.",
      "Passwords, tokens, cookies, IP addresses, or device identifiers.",
      "Health data, nutrition, body measurements, training sessions, or personal records.",
      "Session recordings, autocapture, heatmaps, surveys, or automatic SDK events.",
    ],
    pseudonymTitle: "A pseudonym, not your identity",
    pseudonymBody:
      "When you consent, the API creates a pseudonymous identifier with a protected key. PostHog does not receive your identity-provider subject, and Allfit One does not create personal profiles in the analytics provider.",
    providerTitle: "Provider and environment",
    providerBody:
      "Allowed events are processed in PostHog US. Analytics is disabled in development and preview. In production it requires both your consent and an active remote gate for the product you use.",
    providerFacts: [
      ["Processor", "PostHog US"],
      ["Personal profiles", "Disabled"],
    ],
    retentionTitle: "Limited retention",
    retentionItems: [
      ["Product analytics", "Up to 90 days"],
      ["Operational logs", "Up to 30 days"],
    ],
    retentionBody:
      "At the end of each period, data must be deleted or aggregated so it can no longer be used to follow an individual pseudonym.",
    controlTitle: "You stay in control",
    controlItems: [
      ["Before you consent", "We do not load the SDK, request the gate, or send events."],
      ["When you withdraw", "Capture stops and events that occur while it is off are discarded."],
      ["Privacy signals", "Global Privacy Control and Do Not Track keep analytics disabled on the web."],
    ],
    deletionTitle: "Withdrawal and deletion",
    deletionBody:
      "You can change your choice from the Privacy control in Allfit Studio or Allfit Space. To request deletion of information associated with your pseudonym, contact us. We will verify the request without asking you to publish sensitive data.",
    contact: "Request privacy help",
  },
} as const satisfies Record<Language, unknown>;
