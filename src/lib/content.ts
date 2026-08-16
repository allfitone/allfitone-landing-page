export type Language = "es" | "en";

export const content = {
  es: {
    navFitnessId: "Fitness ID",
    navSpace: "Allfit Space",
    navStudio: "Allfit Studio",
    navEcosystem: "Ecosistema",
    analyticsPrivacy: "Privacidad de analítica",
    contact: "Escríbenos",
    contactShort: "Escríbenos",
    mainNavigation: "Navegación principal",
    mobileNavigation: "Navegación móvil",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    homeLink: "Allfit One, inicio",
    menuDescription: "Enlaces a los productos y al ecosistema de Allfit One.",
    selectLanguage: "Seleccionar idioma",
    socialNavigation: "Redes sociales de Allfit One",
    instagramLabel: "Allfit One en Instagram",
    tiktokLabel: "Allfit One en TikTok",
    linkedinLabel: "Allfit One en LinkedIn",
    heroLead:
      "Allfit One conecta a las personas que entrenan con los profesionales y las organizaciones que hacen posible ese entrenamiento. Una identidad, dos productos y un historial que siempre viaja contigo.",
    heroNote: "Todavía no hay demo pública. Escríbenos y te contamos en qué punto estamos.",

    appAudience: "Para personas",
    appDescription: "Entrena por tu cuenta o con un profesional y lleva tu progreso contigo.",
    studioAudience: "Para profesionales y organizaciones",
    studioDescription:
      "Gestiona personas, entrenamiento, progreso y tu operación desde un solo panel.",
    comingSoon: "Próximamente",

    phaseLabel: "Fase actual",

    phoneToday: "Hoy",
    phoneGreeting: "Tu siguiente paso",
    phoneSession: "Fuerza · Tren superior",
    phoneLocation: "18:00 · Allfit Performance",
    phoneRecovery: "Recuperación moderada",
    phoneDuration: "72 min",
    phoneStart: "Comenzar sesión",
    phoneWeek: "Semana",
    phoneAdherence: "Adherencia",

    dashboardOverview: "Resumen",
    dashboardGreeting: "Esto necesita atención hoy.",
    dashboardNavigation: ["Resumen", "Personas", "Entrenamiento", "Operación", "Negocio"],
    dashboardActivePeople: "Personas activas",
    dashboardSessions: "Sesiones hoy",
    dashboardAdherence: "Adherencia",
    dashboardAgenda: "Sesiones de hoy",
    dashboardActivity: "Actividad reciente",
    dashboardViewAll: "Ver todas",
    dashboardSchedule: [
      ["07:00", "Fuerza · Grupo 04", "8 personas"],
      ["10:30", "Evaluación inicial", "Laura Méndez"],
      ["18:00", "Engine · Intermedio", "12 personas"],
    ],
    dashboardUpdates: [
      ["Mariana completó su sesión", "Hace 8 min"],
      ["Nueva relación aceptada", "Hace 21 min"],
      ["Programa asignado y confirmado", "Hace 34 min"],
    ],

    problemLabel: "El problema",
    problemTitle: "Cada vez que cambias, empiezas de cero.",
    problemCopy:
      "Tu historial no vive contigo: vive en la app, el entrenador o el gimnasio de turno. Cuando esa relación termina, tú sigues entrenando, pero tu progreso se queda ahí.",
    problemLedgerLead: "Cuando cambias de gimnasio, de entrenador o de app:",
    problemKeepLabel: "Te llevas",
    problemKeepValue: "Nada",
    problemLoseLabel: "Se queda",
    problemLoseItems: [
      "Tu historial de entrenamiento",
      "Tus marcas personales",
      "Tu progreso y tus métricas",
      "Tu programación",
      "Tus relaciones profesionales",
      "Tu membresía",
    ],
    fitnessIdLabel: "Fitness ID",
    fitnessIdTitle: "Una identidad que no se queda en el gimnasio.",
    fitnessIdCopy:
      "El Fitness ID es tu identidad fitness portátil. Reúne lo que entrenaste, lo que lograste y con quién lo lograste, y permanece contigo cuando cambias de entrenador, de gimnasio, de ciudad o de disciplina.",
    fitnessIdCardLabel: "Contiene",
    fitnessIdCardFooter: "Permanece contigo",
    fitnessIdFields: [
      "Objetivos",
      "Historial de entrenamiento",
      "Marcas personales",
      "Métricas y progreso",
      "Membresías y reservas",
      "Relaciones profesionales",
      "Logros y certificados",
      "Datos autorizados de wearables",
    ],
    fitnessIdControls: [
      ["Tú concedes", "Cada profesional u organización ve únicamente lo que autorizas, para una finalidad declarada."],
      ["Tú revocas", "Retiras un acceso cuando quieras. Tu información no se va con él."],
      ["Tú te lo llevas", "Si la relación termina, el historial sigue siendo tuyo."],
    ],
    fitnessIdNote:
      "El Fitness ID es la tesis de producto de Allfit One. Todavía no es una función pública disponible.",

    appSectionLabel: "Allfit Space",
    appSectionTitle: "Sigue entrenando desde donde lo dejaste.",
    appSectionCopy:
      "Allfit Space reúne tu plan, tus sesiones y tu progreso en un solo lugar. Entrena por tu cuenta o sigue la planificación de un profesional. Si cambias de entrenador, gimnasio o disciplina, continúas desde donde estabas.",
    appPillars: [
      ["Entrena por tu cuenta", "Organiza tus sesiones y registra lo que haces cuando entrenas de forma independiente."],
      ["Sigue el plan de tu entrenador", "Consulta su planificación en el mismo lugar donde registras cada sesión."],
      ["Tu historial sigue contigo", "Tu Fitness ID conserva tus marcas y tu progreso aunque cambies de gimnasio, profesional o disciplina."],
    ],
    appAreasLabel: "Dentro de Allfit Space",
    appAreas: [
      ["Hoy", "Tu próxima sesión"],
      ["Entrena", "Planes, sesiones y progreso"],
      ["Explora", "Profesionales, gimnasios y servicios"],
      ["Comunidad", "Las personas con las que entrenas"],
      ["Tú", "Tu Fitness ID y tus permisos"],
    ],
    appVision: "Visión de producto · Próximamente",

    studioSectionLabel: "Allfit Studio",
    studioSectionTitle: "Organiza tu negocio sin perder de vista a tus clientes.",
    studioSectionCopy:
      "Con Allfit Studio, entrenadores y organizaciones gestionan clientes, planificación y seguimiento desde un mismo panel. Cada persona entra con su Fitness ID, decide qué comparte y conserva su historial.",
    studioDifferentiatorsLabel: "Cómo funciona Studio",
    studioDifferentiators: [
      [
        "Cada persona entra con su identidad",
        "La relación comienza cuando acepta una invitación. Studio usa su Fitness ID y solo muestra los datos que decidió compartir.",
      ],
      [
        "Compara el plan con lo que ocurrió",
        "Studio conserva cada versión del programa y la compara con lo que la persona registró en sus sesiones.",
      ],
      [
        "Cada persona decide qué comparte",
        "El acceso depende de una relación, una autorización y una asignación vigentes. Ser dueño o administrador no basta.",
      ],
      [
        "Los cobros llegan a tu organización",
        "Cada pago pasa por tu propia pasarela. Allfit no recibe ni retiene el dinero.",
      ],
    ],
    studioModulesLabel: "Lo que gestionas desde Studio",
    studioModules: [
      ["Personas", "Invitaciones, relaciones y seguimiento de clientes"],
      ["Entrenamiento", "Plantillas, programas, asignaciones e historial de versiones"],
      ["Progreso", "Sesiones registradas, adherencia y resultados compartidos"],
      ["Equipo", "Miembros, roles y permisos"],
      ["Nutrición", "Registros y orientación según los permisos de cada persona"],
      ["Planes", "Planes que vendes y suscripciones activas"],
    ],
    studioUpcomingLabel: "Más adelante",
    studioUpcoming: ["Agenda y reservas", "Clases y cupos", "Página pública", "Marketplace"],

    ecosystemLabel: "Ecosistema",
    ecosystemTitle: "Dos productos. Una sola relación.",
    ecosystemCopy:
      "Allfit Space acompaña a la persona. Allfit Studio organiza a quienes hacen posible su experiencia. Allfit One conecta ambos lados con identidad, permisos e información compartida.",
    ecosystemRows: [
      ["La persona entrena", "El profesional programa"],
      ["La persona acepta", "La organización propone"],
      ["La persona registra progreso", "El profesional analiza"],
      ["La persona conserva su historia", "La organización accede con permiso"],
    ],

    statusLabel: "Dónde estamos",
    statusTitle: "Estamos construyendo Allfit One.",
    statusCopy:
      "Allfit Space y Allfit Studio están en desarrollo. El Fitness ID es la tesis de producto que los conecta.",
    statusRows: [
      ["Allfit Space", "En desarrollo", "Entrena por tu cuenta o sigue el plan de un profesional. Tu historial permanece contigo."],
      ["Allfit Studio", "En desarrollo", "Gestiona clientes, planificación, progreso y suscripciones desde un mismo panel."],
      ["Fitness ID", "Tesis de producto", "Cada persona conserva su historial y decide qué comparte."],
    ],
    built: "Creado para el movimiento",
    tagline: "All the fitness in one place.",
  },
  en: {
    navFitnessId: "Fitness ID",
    navSpace: "Allfit Space",
    navStudio: "Allfit Studio",
    navEcosystem: "Ecosystem",
    analyticsPrivacy: "Analytics privacy",
    contact: "Get in touch",
    contactShort: "Contact",
    mainNavigation: "Main navigation",
    mobileNavigation: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    homeLink: "Allfit One, home",
    menuDescription: "Links to Allfit One products and ecosystem.",
    selectLanguage: "Select language",
    socialNavigation: "Allfit One social media",
    instagramLabel: "Allfit One on Instagram",
    tiktokLabel: "Allfit One on TikTok",
    linkedinLabel: "Allfit One on LinkedIn",
    heroLead:
      "Allfit One connects the people who train with the professionals and organizations who make that training possible. One identity, two products and a history that always travels with you.",
    heroNote: "There is no public demo yet. Write to us and we'll tell you where we are.",

    appAudience: "For people",
    appDescription: "Train on your own or with a professional and keep your progress with you.",
    studioAudience: "For professionals and organizations",
    studioDescription: "Manage people, training, progress and your operation from one dashboard.",
    comingSoon: "Coming soon",

    phaseLabel: "Current phase",

    phoneToday: "Today",
    phoneGreeting: "Your next move",
    phoneSession: "Strength · Upper body",
    phoneLocation: "18:00 · Allfit Performance",
    phoneRecovery: "Moderate recovery",
    phoneDuration: "72 min",
    phoneStart: "Start session",
    phoneWeek: "Week",
    phoneAdherence: "Adherence",

    dashboardOverview: "Overview",
    dashboardGreeting: "This needs attention today.",
    dashboardNavigation: ["Overview", "People", "Training", "Operations", "Business"],
    dashboardActivePeople: "Active people",
    dashboardSessions: "Sessions today",
    dashboardAdherence: "Adherence",
    dashboardAgenda: "Today's sessions",
    dashboardActivity: "Recent activity",
    dashboardViewAll: "View all",
    dashboardSchedule: [
      ["07:00", "Strength · Group 04", "8 people"],
      ["10:30", "Initial assessment", "Laura Méndez"],
      ["18:00", "Engine · Intermediate", "12 people"],
    ],
    dashboardUpdates: [
      ["Mariana completed her session", "8 min ago"],
      ["New relationship accepted", "21 min ago"],
      ["Program assigned and confirmed", "34 min ago"],
    ],

    problemLabel: "The problem",
    problemTitle: "Every time you switch, you start over.",
    problemCopy:
      "Your history does not live with you: it lives in whichever app, coach or gym you are using. When that relationship ends, you keep training, but your progress stays behind.",
    problemLedgerLead: "When you change gym, coach or app:",
    problemKeepLabel: "You take",
    problemKeepValue: "Nothing",
    problemLoseLabel: "Stays behind",
    problemLoseItems: [
      "Your training history",
      "Your personal records",
      "Your progress and metrics",
      "Your programming",
      "Your professional relationships",
      "Your membership",
    ],
    fitnessIdLabel: "Fitness ID",
    fitnessIdTitle: "An identity that doesn't stay at the gym.",
    fitnessIdCopy:
      "Fitness ID is your portable fitness identity. It holds what you trained, what you achieved and who you achieved it with, and it stays with you when you change coach, gym, city or discipline.",
    fitnessIdCardLabel: "Holds",
    fitnessIdCardFooter: "Stays with you",
    fitnessIdFields: [
      "Goals",
      "Training history",
      "Personal records",
      "Metrics and progress",
      "Memberships and bookings",
      "Professional relationships",
      "Achievements and certificates",
      "Authorized wearable data",
    ],
    fitnessIdControls: [
      ["You grant", "Every professional or organization sees only what you authorize, for a declared purpose."],
      ["You revoke", "Withdraw an access whenever you want. Your information does not leave with it."],
      ["You keep it", "If the relationship ends, the history is still yours."],
    ],
    fitnessIdNote:
      "Fitness ID is the Allfit One product thesis. It is not a publicly available feature yet.",

    appSectionLabel: "Allfit Space",
    appSectionTitle: "Keep training from where you left off.",
    appSectionCopy:
      "Allfit Space brings your plan, sessions and progress into one place. Train on your own or follow a professional's plan. If you change coach, gym or discipline, you pick up where you left off.",
    appPillars: [
      ["Train on your own", "Plan your sessions and log what you do when you train independently."],
      ["Follow your coach's plan", "Keep their plan in the same place where you log each session."],
      ["Your history stays with you", "Your Fitness ID keeps your records and progress when you change gym, coach or discipline."],
    ],
    appAreasLabel: "Inside Allfit Space",
    appAreas: [
      ["Today", "Your next session"],
      ["Train", "Plans, sessions and progress"],
      ["Explore", "Professionals, gyms and services"],
      ["Community", "The people you train with"],
      ["You", "Your Fitness ID and permissions"],
    ],
    appVision: "Product vision · Coming soon",

    studioSectionLabel: "Allfit Studio",
    studioSectionTitle: "Run your business without losing sight of your clients.",
    studioSectionCopy:
      "Allfit Studio gives coaches and organizations one place to manage clients, planning and follow-up. Each person joins with their Fitness ID, decides what to share and keeps their history.",
    studioDifferentiatorsLabel: "How Studio works",
    studioDifferentiators: [
      [
        "Each person joins with their own identity",
        "The relationship begins when they accept an invitation. Studio uses their Fitness ID and only shows the data they chose to share.",
      ],
      [
        "Compare the plan with what happened",
        "Studio keeps every version of the program and compares it with what the person logged in their sessions.",
      ],
      [
        "Each person decides what to share",
        "Access depends on an active relationship, authorization and assignment. Being an owner or admin is not enough.",
      ],
      [
        "Payments go to your organization",
        "Each payment goes through your own gateway. Allfit does not receive or hold the money.",
      ],
    ],
    studioModulesLabel: "What you manage in Studio",
    studioModules: [
      ["People", "Invitations, relationships and client follow-up"],
      ["Training", "Templates, programs, assignments and version history"],
      ["Progress", "Logged sessions, adherence and shared results"],
      ["Team", "Members, roles and permissions"],
      ["Nutrition", "Logs and guidance based on each person's permissions"],
      ["Plans", "Plans you sell and active subscriptions"],
    ],
    studioUpcomingLabel: "Later",
    studioUpcoming: ["Schedule and bookings", "Classes and capacity", "Public page", "Marketplace"],

    ecosystemLabel: "Ecosystem",
    ecosystemTitle: "Two products. One relationship.",
    ecosystemCopy:
      "Allfit Space stays with the person. Allfit Studio organizes the people who make their experience possible. Allfit One connects both sides through identity, permissions and shared information.",
    ecosystemRows: [
      ["The person trains", "The professional programs"],
      ["The person accepts", "The organization proposes"],
      ["The person logs progress", "The professional analyzes"],
      ["The person keeps their history", "The organization accesses it with permission"],
    ],

    statusLabel: "Where we are",
    statusTitle: "We're building Allfit One.",
    statusCopy:
      "Allfit Space and Allfit Studio are in development. Fitness ID is the product thesis that connects them.",
    statusRows: [
      ["Allfit Space", "In development", "Train on your own or follow a professional's plan. Your history stays with you."],
      ["Allfit Studio", "In development", "Manage clients, planning, progress and subscriptions from one dashboard."],
      ["Fitness ID", "Product thesis", "Each person keeps their history and decides what to share."],
    ],
    built: "Built for movement",
    tagline: "All the fitness in one place.",
  },
} as const;

export type LocalizedContent = (typeof content)[Language];

export const analyticsPrivacyContent = {
  es: {
    metaTitle: "Privacidad de analítica | Allfit One",
    metaDescription:
      "Cómo funciona la analítica opcional de Allfit One, qué datos permitimos, qué datos prohibimos y cómo retirar el consentimiento.",
    selectLanguage: "Seleccionar idioma",
    home: "Volver a Allfit One",
    navigation: "Contenido del aviso",
    kicker: "Privacidad · Analítica opcional",
    title: "Lo que medimos. Lo que nunca tocamos.",
    lead:
      "La analítica de Allfit One es opcional. Nos ayuda a detectar fallos y entender el rendimiento sin leer tu contenido ni convertir tu actividad física en un perfil.",
    versionLabel: "Aviso vigente",
    version: "analytics-v1",
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
    providerBoundary: "Procesador: PostHog US · Perfiles personales: deshabilitados",
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
      "Puedes cambiar tu decisión desde el control Privacidad de Allfit Studio, Allfit Space o el Backoffice autorizado. Para solicitar la eliminación de la información asociada a tu seudónimo, escríbenos. Verificaremos la solicitud sin pedirte que publiques datos sensibles.",
    contact: "Solicitar ayuda de privacidad",
    footer: "Allfit One · Aviso de analítica analytics-v1",
  },
  en: {
    metaTitle: "Analytics privacy | Allfit One",
    metaDescription:
      "How optional Allfit One analytics works, which data is allowed, which data is prohibited, and how to withdraw consent.",
    selectLanguage: "Select language",
    home: "Back to Allfit One",
    navigation: "Notice contents",
    kicker: "Privacy · Optional analytics",
    title: "What we measure. What we never touch.",
    lead:
      "Allfit One analytics is optional. It helps us find failures and understand performance without reading your content or turning your fitness activity into a profile.",
    versionLabel: "Current notice",
    version: "analytics-v1",
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
    providerBoundary: "Processor: PostHog US · Personal profiles: disabled",
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
      "You can change your choice from the Privacy control in Allfit Studio, Allfit Space, or the authorized Backoffice. To request deletion of information associated with your pseudonym, contact us. We will verify the request without asking you to publish sensitive data.",
    contact: "Request privacy help",
    footer: "Allfit One · Analytics notice analytics-v1",
  },
} as const;

export const LANGUAGE_STORAGE_KEY = "allfitone-language";

export function readStoredLanguage(): Language {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === "en" ? "en" : "es";
  } catch {
    return "es";
  }
}

export function writeStoredLanguage(language: Language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // The selected locale remains active for this session when storage is unavailable.
  }
}
