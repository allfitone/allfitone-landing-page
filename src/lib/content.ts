export const languages = ["es", "en"] as const;
export type Language = (typeof languages)[number];
export const defaultLanguage: Language = "es";

export function isLanguage(value: string): value is Language {
  return (languages as readonly string[]).includes(value);
}

/** Open Graph locale codes for each URL language. */
export const ogLocales: Record<Language, string> = { es: "es_CO", en: "en_US" };

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
    footerExplore: "Explora",
    footerSocial: "Síguenos",
    footerInformation: "Información",
    heroLead:
      "Allfit One es el ecosistema donde el fitness se conecta. Una identidad, dos productos y un historial que viaja contigo: para las personas que entrenan y para los profesionales y organizaciones que lo hacen posible.",
    heroNote: "Aún no hay demo pública. Cuéntanos cómo entrenas o gestionas tu espacio.",

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
      "Allfit Space reúne tu plan, tus sesiones y tu progreso en un solo lugar. Entrena por tu cuenta o sigue la planificación de un profesional.",
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
      "Un solo panel para gestionar clientes, planificación, progreso y operación, conectado con el Fitness ID de cada persona.",
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
      ["Planes", "Planes que vendes y suscripciones activas"],
    ],
    studioUpcomingLabel: "Más adelante",
    studioUpcoming: ["Agenda y reservas", "Clases y cupos", "Página pública", "Marketplace"],

    ecosystemLabel: "Ecosistema",
    ecosystemTitle: "Dos productos. Una sola relación.",
    ecosystemCopy: "Dos experiencias distintas sobre una base compartida.",
    ecosystem: {
      space: {
        index: "01",
        title: "Tu historia sigue contigo.",
        copy: "La persona entrena, registra su progreso y conserva su información.",
        tags: ["Identidad", "Progreso", "Historial"],
      },
      connect: {
        title: "Se conectan con tu permiso",
        tags: ["Planes", "Progreso", "Información"],
      },
      studio: {
        index: "02",
        title: "El profesional acompaña sin apropiarse.",
        copy: "Studio permite programar, acompañar y analizar con acceso autorizado.",
        tags: ["Programa", "Acompaña", "Analiza"],
      },
      closingLead: "Cambia quién te acompaña.",
      closingAccent: "No",
      closingRest: "lo que has construido.",
      relation: ["Persona", "Profesional", "Organización"],
      relationShared: "Identidad · Permisos · Información compartida",
    },

    statusLabel: "Dónde estamos",
    statusTitle: "Estamos construyendo Allfit One.",
    statusCopy:
      "Allfit Space y Allfit Studio están en desarrollo. El Fitness ID es la tesis de producto que los conecta.",
    statusRows: [
      ["Allfit Space", "En desarrollo", "Entrena por tu cuenta o sigue el plan de un profesional. Tu historial permanece contigo."],
      ["Allfit Studio", "En desarrollo", "Gestiona clientes, planificación, progreso y suscripciones desde un mismo panel."],
      ["Fitness ID", "Tesis de producto", "Cada persona conserva su historial y decide qué comparte."],
    ],
    closingPrompt:
      "¿Entrenas, acompañas a personas o gestionas un espacio fitness? Escríbenos y construyámoslo contigo.",
    tagline: "All the fitness in one place.",
    inceptionMember: "Allfit One es miembro de NVIDIA Inception.",
    inceptionBadgeAlt: "Insignia del NVIDIA Inception Program",
    // NVIDIA requires its trademark attribution verbatim, so it stays in English in both languages.
    nvidiaTrademarks:
      "© 2026 NVIDIA, the NVIDIA logo, and NVIDIA Inception are trademarks and/or registered trademarks of NVIDIA Corporation in the U.S. and other countries.",
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
    footerExplore: "Explore",
    footerSocial: "Follow",
    footerInformation: "Information",
    heroLead:
      "Allfit One is the ecosystem where fitness connects. One identity, two products and a history that travels with you: for the people who train and for the professionals and organizations who make it possible.",
    heroNote: "There's no public demo yet. Tell us how you train or run your space.",

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
      "Allfit Space brings your plan, sessions and progress into one place. Train on your own or follow a professional's plan.",
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
      "One dashboard to manage clients, planning, progress and operations, connected to each person's Fitness ID.",
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
      ["Plans", "Plans you sell and active subscriptions"],
    ],
    studioUpcomingLabel: "Later",
    studioUpcoming: ["Schedule and bookings", "Classes and capacity", "Public page", "Marketplace"],

    ecosystemLabel: "Ecosystem",
    ecosystemTitle: "Two products. One relationship.",
    ecosystemCopy: "Two distinct experiences on one shared base.",
    ecosystem: {
      space: {
        index: "01",
        title: "Your history stays with you.",
        copy: "The person trains, logs their progress and keeps their information.",
        tags: ["Identity", "Progress", "History"],
      },
      connect: {
        title: "They connect with your permission",
        tags: ["Plans", "Progress", "Information"],
      },
      studio: {
        index: "02",
        title: "The professional guides without owning it.",
        copy: "Studio lets them program, guide and analyze with authorized access.",
        tags: ["Program", "Guide", "Analyze"],
      },
      closingLead: "Change who guides you.",
      closingAccent: "Not",
      closingRest: "what you've built.",
      relation: ["Person", "Professional", "Organization"],
      relationShared: "Identity · Permissions · Shared information",
    },

    statusLabel: "Where we are",
    statusTitle: "We're building Allfit One.",
    statusCopy:
      "Allfit Space and Allfit Studio are in development. Fitness ID is the product thesis that connects them.",
    statusRows: [
      ["Allfit Space", "In development", "Train on your own or follow a professional's plan. Your history stays with you."],
      ["Allfit Studio", "In development", "Manage clients, planning, progress and subscriptions from one dashboard."],
      ["Fitness ID", "Product thesis", "Each person keeps their history and decides what to share."],
    ],
    closingPrompt:
      "Do you train, coach people or run a fitness space? Write to us and let's build it with you.",
    tagline: "All the fitness in one place.",
    inceptionMember: "Allfit One is a member of NVIDIA Inception.",
    inceptionBadgeAlt: "NVIDIA Inception Program badge",
    // NVIDIA requires its trademark attribution verbatim, so it stays in English in both languages.
    nvidiaTrademarks:
      "© 2026 NVIDIA, the NVIDIA logo, and NVIDIA Inception are trademarks and/or registered trademarks of NVIDIA Corporation in the U.S. and other countries.",
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

/**
 * Every string below is a sample. It exists so the ambassador layout can be
 * reviewed with William before he sends his own material, which is why the page
 * stays noindex and out of the sitemap until his content replaces this draft.
 */
export const ambassadorContent = {
  es: {
    metaTitle: "William Vergel · Embajador de Allfit One",
    metaDescription:
      "William Vergel, primer embajador de Allfit One: quién es, cómo entrena y los programas con los que trabaja.",
    selectLanguage: "Seleccionar idioma",
    home: "Volver a Allfit One",
    role: "Primer embajador",
    givenName: "William",
    familyName: "Vergel",
    lead:
      "Entrenador de fuerza e híbrido. Trabaja con gente que quiere rendir sin poner su vida en pausa.",
    heroFacts: ["Fuerza e híbrido", "Presencial y en remoto", "Ocho años entrenando"],
    statement: "Un plan solo sirve si cabe en la semana que ya tienes.",
    aboutBody: [
      "Por eso empieza siempre por ahí: cuántos días puedes entrenar, a qué hora, y con qué te vas a encontrar cuando llegues al gimnasio. El programa se escribe después.",
      "Es entrenador personal certificado y lleva seis años acompañando a otras personas: atletas híbridos, gente que compite y gente que vuelve al gimnasio después de años parada.",
    ],
    methodTitle: "Cómo trabaja",
    method: [
      {
        title: "Mira tu semana",
        body: "Antes de escribir nada, cuenta lo que tienes: cuántos días, a qué hora y con qué equipo.",
      },
      {
        title: "Escribe el plan",
        body: "Un programa con progresión real, hecho para esos días y no para una semana ideal.",
      },
      {
        title: "Ajusta cada mes",
        body: "Revisa cómo responde tu cuerpo y corrige el rumbo antes de que el plan deje de servir.",
      },
    ],
    plansTitle: "Planes",
    plansLead:
      "Cualquier plan sirve para fuerza, híbrido o resistencia. Lo que cambia es cuánto tiempo entrenas con él y cuánto te acompaña.",
    perMonth: "Equivale a {amount} al mes",
    saving: "Ahorras {percent}% frente al plan de 3 meses",
    featuredTag: "Recomendado",
    plans: [
      {
        name: "3 meses",
        who: "Para empezar con estructura y notar el cambio en la primera temporada.",
        cadence: "12 semanas, revisión cada 4",
        includesLead: "Incluye",
        includes: [
          "Plan de 12 semanas escrito para tu semana",
          "Ajuste del plan cada 4 semanas",
          "Revisión de técnica por video, una al mes",
          "Dudas por chat en días hábiles",
        ],
        cta: "Pedir el plan de 3 meses",
      },
      {
        name: "6 meses",
        who: "Para quien ya arrancó y quiere progresar sin estancarse a mitad de camino.",
        cadence: "26 semanas, revisión cada 2",
        includesLead: "Todo lo del plan de 3 meses, más:",
        includes: [
          "Revisión cada 2 semanas en vez de cada 4",
          "Revisión de técnica por video, dos al mes",
          "Evaluación de fuerza y resistencia a mitad del plan",
        ],
        cta: "Pedir el plan de 6 meses",
      },
      {
        name: "1 año",
        who: "Para preparar una temporada completa, con fechas objetivo y picos de rendimiento.",
        cadence: "52 semanas, revisión cada semana",
        includesLead: "Todo lo del plan de 6 meses, más:",
        includes: [
          "Revisión semanal",
          "El año planificado hacia tus fechas objetivo",
          "Evaluación cada 3 meses",
          "Respuesta prioritaria por chat",
        ],
        cta: "Pedir el plan de 1 año",
      },
    ],
    contactTitle: "Entrena con William",
    contactBody:
      "¿Quieres entrenar con él o proponerle algo? Escríbenos y te ponemos en contacto.",
    contact: "Escríbenos",
    footerNavTitle: "Allfit One",
    footerHome: "Inicio",
    footerPrivacy: "Privacidad de analítica",
    footerSocialTitle: "Síguenos",
    rights: "© 2026 Allfit One",
  },
  en: {
    metaTitle: "William Vergel · Allfit One ambassador",
    metaDescription:
      "William Vergel, the first Allfit One ambassador: who he is, how he trains, and the programs he works with.",
    selectLanguage: "Select language",
    home: "Back to Allfit One",
    role: "First ambassador",
    givenName: "William",
    familyName: "Vergel",
    lead:
      "Strength and hybrid coach. He works with people who want to perform without putting life on hold.",
    heroFacts: ["Strength and hybrid", "In person and remote", "Eight years training"],
    statement: "A plan only works if it fits the week you already have.",
    aboutBody: [
      "So that is where he starts: how many days you can train, at what time, and what you will run into when you get to the gym. The program is written after that.",
      "He is a certified personal trainer and has coached others for six years: hybrid athletes, people who compete, and people returning to the gym after years away.",
    ],
    methodTitle: "How he works",
    method: [
      {
        title: "Look at your week",
        body: "Before writing anything, count what you have: how many days, at what time, and with what equipment.",
      },
      {
        title: "Write the plan",
        body: "A program with real progression, built for those days rather than for an ideal week.",
      },
      {
        title: "Adjust every month",
        body: "Check how your body responds and correct course before the plan stops working.",
      },
    ],
    plansTitle: "Plans",
    plansLead:
      "Any plan works for strength, hybrid, or endurance. What changes is how long you train with him and how closely he coaches you.",
    perMonth: "That is {amount} a month",
    saving: "Save {percent}% compared with the 3-month plan",
    featuredTag: "Recommended",
    plans: [
      {
        name: "3 months",
        who: "To start with structure and feel the change within the first season.",
        cadence: "12 weeks, a review every 4",
        includesLead: "Includes",
        includes: [
          "A 12-week plan written for your week",
          "Plan adjusted every 4 weeks",
          "One video technique review a month",
          "Questions by chat on business days",
        ],
        cta: "Ask for the 3-month plan",
      },
      {
        name: "6 months",
        who: "For anyone already underway who wants to keep progressing without stalling halfway.",
        cadence: "26 weeks, a review every 2",
        includesLead: "Everything in the 3-month plan, plus:",
        includes: [
          "A review every 2 weeks instead of every 4",
          "Two video technique reviews a month",
          "A strength and endurance assessment halfway through",
        ],
        cta: "Ask for the 6-month plan",
      },
      {
        name: "1 year",
        who: "To prepare a full season, with target dates and performance peaks.",
        cadence: "52 weeks, a review every week",
        includesLead: "Everything in the 6-month plan, plus:",
        includes: [
          "A weekly review",
          "The year planned toward your target dates",
          "An assessment every 3 months",
          "Priority replies by chat",
        ],
        cta: "Ask for the 1-year plan",
      },
    ],
    contactTitle: "Train with William",
    contactBody:
      "Want to train with him, or bring him an idea? Write to us and we will connect you.",
    contact: "Write to us",
    footerNavTitle: "Allfit One",
    footerHome: "Home",
    footerPrivacy: "Analytics privacy",
    footerSocialTitle: "Follow us",
    rights: "© 2026 Allfit One",
  },
} as const;

/**
 * Plan numbers are language-neutral, so they live once here. Prices are whole
 * Colombian pesos; the per-month figure and the saving are derived from them.
 */
export const ambassadorPlans: { months: number; price: number; featured: boolean }[] = [
  { months: 3, price: 450_000, featured: false },
  { months: 6, price: 810_000, featured: true },
  { months: 12, price: 1_440_000, featured: false },
];

/** Handles and links are not translated, so they live outside the localized copy. */
export const ambassadorSocials: { platform: string; handle: string; url: string }[] = [
  { platform: "Instagram", handle: "@pendiente", url: "" },
  { platform: "TikTok", handle: "@pendiente", url: "" },
];
