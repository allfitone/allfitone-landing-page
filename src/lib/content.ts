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
      "Cambias de entrenador, de gimnasio o de app y tu historial se queda atrás. Estamos construyendo Allfit One para que se quede contigo: Allfit Space para quien entrena, Allfit Studio para quien acompaña y gestiona.",
    heroAction: "Únete a la lista de espera",

    appAudience: "Para personas",
    appDescription: "Entrena por tu cuenta o con un profesional, sin empezar de cero cada vez.",
    studioAudience: "Para profesionales y organizaciones",
    studioDescription:
      "Gestiona personas, entrenamiento, progreso y tu operación desde un solo panel.",
    spaceLink: "Conoce Allfit Space",
    studioLink: "Conoce Allfit Studio",

    phoneToday: "Hoy",
    phoneGreeting: "Tu siguiente paso",
    phoneSession: "Fuerza · Tren superior",
    phoneLocation: "18:00 · Estudio Norte",
    phoneRecovery: "Recuperación moderada",
    phoneDuration: "72 min",
    phoneStart: "Comenzar sesión",
    phoneWeek: "Semana",
    phoneSharedWith: "Compartes con",

    dashboardOverview: "Resumen",
    dashboardGreeting: "Esto necesita atención hoy.",
    dashboardNavigation: ["Resumen", "Personas", "Entrenamiento", "Operación", "Negocio"],
    dashboardOrganization: "Estudio Norte",
    dashboardPerson: "Mariana Rojas",
    dashboardShared: "Compartió su historial contigo",
    dashboardWeekDays: ["L", "M", "X", "J", "V"],
    dashboardWeekSummary: "4 de 5 sesiones hechas · hoy, 18:00",
    dashboardAgenda: "Sesiones de hoy",
    dashboardActivity: "Actividad reciente",
    dashboardViewAll: "Ver todas",
    dashboardSchedule: [
      ["07:00", "Fuerza · Grupo 04", "8 personas"],
      ["10:30", "Evaluación inicial", "Laura Méndez"],
      ["18:00", "Fuerza · Tren superior", "Mariana Rojas"],
    ],
    dashboardUpdates: [
      ["Mariana compartió su historial", "Hace 8 min"],
      ["Laura aceptó tu invitación", "Hace 21 min"],
      ["Programa asignado a Grupo 04", "Hace 34 min"],
    ],

    problemLabel: "El problema",
    problemTitle: "Cada vez que cambias, empiezas de cero.",
    problemCopy:
      "Tu historial no vive contigo: vive en la app, el entrenador o el gimnasio de turno. Cuando esa relación termina, tú sigues entrenando, pero tu progreso se queda ahí.",
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
      "El Fitness ID reúne lo que entrenaste, lo que lograste y con quién lo lograste. No pertenece a la app, al entrenador ni al gimnasio de turno: es tuyo, y tú decides quién lo ve.",
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
      "Allfit Space reúne tu plan, tus sesiones y tu progreso. Entrena por tu cuenta o sigue la planificación de un profesional en el mismo lugar donde registras cada sesión.",
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
      "Studio trabaja sobre el Fitness ID de cada persona: planificas, sigues su progreso y llevas tu operación sin pedirle que empiece de cero.",
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
        "Nadie ve a una persona solo por su cargo",
        "El acceso depende de una relación, una autorización y una asignación vigentes. Ser dueño o administrador no basta.",
      ],
      [
        "Los cobros llegan a tu organización",
        "Cada pago pasa por tu propia pasarela. Allfit One no recibe ni retiene el dinero.",
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
    ecosystemCopy: "Allfit Space es de la persona; Allfit Studio, del profesional y su organización.",
    ecosystem: {
      space: {
        title: "La persona es dueña de lo que registra.",
        copy: "En Allfit Space registra sesiones, marcas y progreso, y elige qué ve cada profesional.",
      },
      connect: {
        title: "Se conectan con tu permiso",
      },
      studio: {
        title: "El profesional acompaña sin apropiarse.",
        copy: "Desde Allfit Studio programa, sigue lo que la persona registró y analiza su progreso con el acceso que ella concedió.",
      },
      closingLead: "Cambia quién te acompaña.",
      closingAccent: "No",
      closingRest: "lo que has construido.",
      relation: ["Persona", "Profesional", "Organización"],
    },

    statusLabel: "Lista de espera",
    statusTitle: "Estamos construyendo Allfit One.",
    statusCopy:
      "Déjanos tu correo y te avisaremos cuando Allfit Space y Allfit Studio abran sus puertas.",
    // Each row links to where the product is explained instead of describing it a third time.
    statusRows: [
      { name: "Allfit Space", state: "En desarrollo", target: "space" },
      { name: "Allfit Studio", state: "En desarrollo", target: "studio" },
      { name: "Fitness ID", state: "Tesis de producto", target: "fitness-id" },
    ],
    statusFitnessIdLink: "Qué es el Fitness ID",
    waitlist: {
      label: "Tu correo",
      placeholder: "nombre@correo.com",
      submit: "Unirme a la lista",
      pending: "Un momento…",
      errorEmpty: "Escribe tu correo para unirte.",
      errorInvalid: "Revisa el correo: necesita la forma nombre@correo.com.",
      failed: "No pudimos apuntarte. Inténtalo de nuevo o escríbenos a",
      joinedTitle: "Ya estás en la lista.",
      joinedBody: "Te escribiremos a {email} cuando abramos.",
      reset: "Usar otro correo",
      note: "Solo usaremos tu correo para avisarte cuando abramos.",
    },
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
      "You change coach, gym or app, and your history stays behind. We're building Allfit One so it stays with you: Allfit Space for the people who train, Allfit Studio for the people who coach and run the work.",
    heroAction: "Join the waitlist",

    appAudience: "For people",
    appDescription: "Train on your own or with a professional, without starting over each time.",
    studioAudience: "For professionals and organizations",
    studioDescription: "Manage people, training, progress and your operation from one dashboard.",
    spaceLink: "Explore Allfit Space",
    studioLink: "Explore Allfit Studio",

    phoneToday: "Today",
    phoneGreeting: "Your next move",
    phoneSession: "Strength · Upper body",
    phoneLocation: "18:00 · Estudio Norte",
    phoneRecovery: "Moderate recovery",
    phoneDuration: "72 min",
    phoneStart: "Start session",
    phoneWeek: "Week",
    phoneSharedWith: "Shared with",

    dashboardOverview: "Overview",
    dashboardGreeting: "This needs attention today.",
    dashboardNavigation: ["Overview", "People", "Training", "Operations", "Business"],
    dashboardOrganization: "Estudio Norte",
    dashboardPerson: "Mariana Rojas",
    dashboardShared: "Shared her history with you",
    dashboardWeekDays: ["M", "T", "W", "T", "F"],
    dashboardWeekSummary: "4 of 5 sessions done · today, 18:00",
    dashboardAgenda: "Today's sessions",
    dashboardActivity: "Recent activity",
    dashboardViewAll: "View all",
    dashboardSchedule: [
      ["07:00", "Strength · Group 04", "8 people"],
      ["10:30", "Initial assessment", "Laura Méndez"],
      ["18:00", "Strength · Upper body", "Mariana Rojas"],
    ],
    dashboardUpdates: [
      ["Mariana shared her history", "8 min ago"],
      ["Laura accepted your invitation", "21 min ago"],
      ["Program assigned to Group 04", "34 min ago"],
    ],

    problemLabel: "The problem",
    problemTitle: "Every time you switch, you start over.",
    problemCopy:
      "Your history does not live with you: it lives in whichever app, coach or gym you are using. When that relationship ends, you keep training, but your progress stays behind.",
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
      "Fitness ID holds what you trained, what you achieved and who you achieved it with. It doesn't belong to whichever app, coach or gym you are using: it's yours, and you decide who sees it.",
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
      "Allfit Space brings together your plan, your sessions and your progress. Train on your own or follow a professional's plan in the same place where you log each session.",
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
      "Studio works on each person's Fitness ID: you plan, follow their progress and run your operation without asking them to start over.",
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
        "No one sees a person just because of their role",
        "Access depends on an active relationship, authorization and assignment. Being an owner or admin is not enough.",
      ],
      [
        "Payments go to your organization",
        "Each payment goes through your own gateway. Allfit One does not receive or hold the money.",
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
    ecosystemCopy: "Allfit Space belongs to the person; Allfit Studio, to the professional and their organization.",
    ecosystem: {
      space: {
        title: "The person owns what they log.",
        copy: "In Allfit Space they log sessions, records and progress, and choose what each professional sees.",
      },
      connect: {
        title: "They connect with your permission",
      },
      studio: {
        title: "The professional guides without owning it.",
        copy: "From Allfit Studio they program, follow what the person logged and analyze progress, with the access the person granted.",
      },
      closingLead: "Change who guides you.",
      closingAccent: "Not",
      closingRest: "what you've built.",
      relation: ["Person", "Professional", "Organization"],
    },

    statusLabel: "Waitlist",
    statusTitle: "We're building Allfit One.",
    statusCopy:
      "Leave your email and we'll let you know when Allfit Space and Allfit Studio open their doors.",
    statusRows: [
      { name: "Allfit Space", state: "In development", target: "space" },
      { name: "Allfit Studio", state: "In development", target: "studio" },
      { name: "Fitness ID", state: "Product thesis", target: "fitness-id" },
    ],
    statusFitnessIdLink: "What Fitness ID is",
    waitlist: {
      label: "Your email",
      placeholder: "name@email.com",
      submit: "Join the list",
      pending: "One moment…",
      errorEmpty: "Enter your email to join.",
      errorInvalid: "Check the email: it needs the form name@email.com.",
      failed: "We couldn't add you. Try again or write to us at",
      joinedTitle: "You're on the list.",
      joinedBody: "We'll write to {email} when we open.",
      reset: "Use another email",
      note: "We'll only use your email to tell you when we open.",
    },
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
 * Interface copy shared by every ambassador page. Each ambassador's own copy, plans,
 * and photos live in their profile under `src/data/ambassadors/`. `{basePlan}` is
 * filled with the base plan's duration, such as "3 meses" or "3-month".
 */
export const ambassadorPageContent = {
  es: {
    selectLanguage: "Seleccionar idioma",
    perMonth: "Equivale a {amount} al mes",
    saving: "Ahorras {percent}% frente al plan de {basePlan}",
    featuredTag: "Recomendado",
    contact: "Escríbenos",
    footerNavTitle: "Allfit One",
    footerHome: "Inicio",
    footerPrivacy: "Privacidad de analítica",
    footerSocialTitle: "Síguenos",
    rights: "© 2026 Allfit One",
  },
  en: {
    selectLanguage: "Select language",
    perMonth: "That is {amount} a month",
    saving: "Save {percent}% compared with the {basePlan} plan",
    featuredTag: "Recommended",
    contact: "Write to us",
    footerNavTitle: "Allfit One",
    footerHome: "Home",
    footerPrivacy: "Analytics privacy",
    footerSocialTitle: "Follow us",
    rights: "© 2026 Allfit One",
  },
} as const;
