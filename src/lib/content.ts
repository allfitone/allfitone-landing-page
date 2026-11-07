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
    navAction: "Únete a la lista",
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
    spaceSectionLink: "Más sobre Allfit Space",
    studioSectionLink: "Más sobre Allfit Studio",
    // Read after a product link's label: every link to a product landing opens a new tab.
    opensInNewTab: "(se abre en una pestaña nueva)",

    sessionName: "Fuerza · Tren superior",

    studioNavigation: ["Resumen", "Personas", "Entrenamiento", "Operación", "Negocio"],
    studioOrganization: "Estudio Norte",

    problemLabel: "El problema",
    problemTitle: "Cada vez que cambias, empiezas de cero.",
    problemCopy:
      "Tu historial no vive contigo: vive en la app, el entrenador o el gimnasio de turno. Cuando esa relación termina, tú sigues entrenando, pero tu progreso se queda ahí.",
    // The ledger speaks to the reader, like the title: what you take, what you leave.
    problemKeepLabel: "Tú te llevas",
    problemKeepValue: "Nada",
    problemLoseLabel: "Dejas en tu antiguo gimnasio",
    // Your record at the gym you leave, in real figures rather
    // than categories. The Fitness ID card in the next section holds the same kinds of
    // data, kept instead of lost.
    problemLoseItems: [
      ["Sesiones registradas", "184"],
      ["Mejor sentadilla", "95 kg"],
      ["Programa de fuerza", "12 semanas"],
      ["Notas sobre tu lesión de rodilla", "11"],
      ["Con el mismo entrenador", "2 años"],
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

    appSectionLabel: "Allfit Space",
    appSectionTitle: "Sigue entrenando desde donde lo dejaste.",
    appSectionCopy:
      "Allfit Space reúne tu plan, tus sesiones y tu progreso. Entrena por tu cuenta o sigue la planificación de un profesional en el mismo lugar donde registras cada sesión.",
    // The section's phone shows the person's 18:00 session under way: the program comes from
    // Estudio Norte and the person logs it set by set. The first exercise with sets left is the
    // one she is on.
    spaceSession: {
      status: "En curso · 24 min",
      plan: "Programa de Estudio Norte · Semana 3 de 4",
      exercises: [
        { name: "Press de banca", sets: 4, reps: "8", load: 60, done: 4, logged: "8" },
        { name: "Remo con barra", sets: 4, reps: "10", load: 50, done: 2, logged: "10" },
        { name: "Press militar", sets: 3, reps: "10", load: 30, done: 0, logged: "8" },
        { name: "Dominadas", sets: 3, reps: "máx.", load: null, done: 0, logged: "6" },
      ],
      setOf: "Serie {set} de {sets}",
      reps: "reps",
      logSet: "Registrar serie",
    },

    studioSectionLabel: "Allfit Studio",
    studioSectionTitle: "Organiza tu negocio sin perder de vista a tus clientes.",
    studioSectionCopy:
      "Studio trabaja sobre el Fitness ID de cada persona: planificas, sigues su progreso y llevas tu operación sin pedirle que empiece de cero.",
    // The section's panel closes the story the Space phone starts: the person finished the 18:00 session
    // in Allfit Space and Estudio Norte reviews it against the program it assigned. The plan
    // and the log both come from `spaceSession`, so the two screens agree.
    studioReview: {
      status: "Hoy, 18:00 · terminada",
      columns: ["Ejercicio", "Plan", "Registrado"],
      asPlanned: "Según el plan",
      fewerReps: "{n} reps menos",
      programLabel: "Programa asignado",
      program: "Fuerza · 4 semanas",
      programWeek: "Semana 3 de 4",
      accessLabel: "Acceso",
      access: "Historial de entrenamiento",
      accessPurpose: "Para seguir su programa. Lo autorizó {name}.",
      action: "Ajustar la próxima sesión",
    },

    statusLabel: "Lista de espera",
    statusTitle: "Estamos construyendo Allfit One.",
    statusCopy:
      "Déjanos tu nombre y tu correo, y te avisaremos cuando Allfit Space y Allfit Studio abran sus puertas.",
    waitlist: {
      nameLabel: "Tu nombre",
      // The placeholders and the address example use the visit's person: `{handle}` is the
      // name in lower case.
      namePlaceholder: "{name}",
      emailLabel: "Tu correo",
      emailPlaceholder: "{handle}@correo.com",
      roleLegend: "¿Cómo usarías Allfit One?",
      // Keyed by the role id the waitlist stores (`waitlistRoles`), never by position.
      roles: [
        { id: "train", label: "Para entrenar" },
        { id: "coach", label: "Para acompañar a mis clientes" },
        { id: "gym", label: "Para gestionar un gimnasio o estudio" },
      ],
      submit: "Unirme a la lista",
      pending: "Un momento…",
      errorNameEmpty: "Escribe tu nombre para unirte.",
      errorEmailEmpty: "Escribe tu correo para unirte.",
      errorEmailInvalid: "Revisa el correo: necesita la forma {handle}@correo.com.",
      errorRole: "Elige cómo usarías Allfit One.",
      failed: "No pudimos apuntarte. Inténtalo de nuevo o escríbenos a",
      joinedTitle: "Ya estás en la lista, {name}.",
      // Each role hears about the product that is theirs.
      joinedBody: {
        train: "Te escribiremos a {email} cuando abra Allfit Space.",
        coach: "Te escribiremos a {email} cuando abra Allfit Studio.",
        gym: "Te escribiremos a {email} cuando abra Allfit Studio.",
      },
      reset: "Usar otro correo",
      note: "Solo usaremos tu nombre y tu correo para avisarte cuando abramos.",
    },
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
    navAction: "Join the list",
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
    spaceSectionLink: "More about Allfit Space",
    studioSectionLink: "More about Allfit Studio",
    opensInNewTab: "(opens in a new tab)",

    sessionName: "Strength · Upper body",

    studioNavigation: ["Overview", "People", "Training", "Operations", "Business"],
    studioOrganization: "Estudio Norte",

    problemLabel: "The problem",
    problemTitle: "Every time you switch, you start over.",
    problemCopy:
      "Your history does not live with you: it lives in whichever app, coach or gym you are using. When that relationship ends, you keep training, but your progress stays behind.",
    problemKeepLabel: "You take",
    problemKeepValue: "Nothing",
    problemLoseLabel: "You leave behind at your old gym",
    problemLoseItems: [
      ["Logged sessions", "184"],
      ["Best squat", "95 kg"],
      ["Strength program", "12 weeks"],
      ["Notes on your knee injury", "11"],
      ["With the same coach", "2 years"],
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

    appSectionLabel: "Allfit Space",
    appSectionTitle: "Keep training from where you left off.",
    appSectionCopy:
      "Allfit Space brings together your plan, your sessions and your progress. Train on your own or follow a professional's plan in the same place where you log each session.",
    spaceSession: {
      status: "In progress · 24 min",
      plan: "Estudio Norte program · Week 3 of 4",
      exercises: [
        { name: "Bench press", sets: 4, reps: "8", load: 60, done: 4, logged: "8" },
        { name: "Barbell row", sets: 4, reps: "10", load: 50, done: 2, logged: "10" },
        { name: "Overhead press", sets: 3, reps: "10", load: 30, done: 0, logged: "8" },
        { name: "Pull-ups", sets: 3, reps: "max", load: null, done: 0, logged: "6" },
      ],
      setOf: "Set {set} of {sets}",
      reps: "reps",
      logSet: "Log set",
    },

    studioSectionLabel: "Allfit Studio",
    studioSectionTitle: "Run your business without losing sight of your clients.",
    studioSectionCopy:
      "Studio works on each person's Fitness ID: you plan, follow their progress and run your operation without asking them to start over.",
    studioReview: {
      status: "Today, 18:00 · finished",
      columns: ["Exercise", "Plan", "Logged"],
      asPlanned: "As planned",
      fewerReps: "{n} fewer reps",
      programLabel: "Assigned program",
      program: "Strength · 4 weeks",
      programWeek: "Week 3 of 4",
      accessLabel: "Access",
      access: "Training history",
      accessPurpose: "To follow the program. Granted by {name}.",
      action: "Adjust the next session",
    },

    statusLabel: "Waitlist",
    statusTitle: "We're building Allfit One.",
    statusCopy:
      "Leave your name and email, and we'll let you know when Allfit Space and Allfit Studio open their doors.",
    waitlist: {
      nameLabel: "Your name",
      namePlaceholder: "{name}",
      emailLabel: "Your email",
      emailPlaceholder: "{handle}@email.com",
      roleLegend: "How would you use Allfit One?",
      roles: [
        { id: "train", label: "To train" },
        { id: "coach", label: "To coach my clients" },
        { id: "gym", label: "To run a gym or studio" },
      ],
      submit: "Join the list",
      pending: "One moment…",
      errorNameEmpty: "Enter your name to join.",
      errorEmailEmpty: "Enter your email to join.",
      errorEmailInvalid: "Check the email: it needs the form {handle}@email.com.",
      errorRole: "Choose how you'd use Allfit One.",
      failed: "We couldn't add you. Try again or write to us at",
      joinedTitle: "You're on the list, {name}.",
      joinedBody: {
        train: "We'll write to {email} when Allfit Space opens.",
        coach: "We'll write to {email} when Allfit Studio opens.",
        gym: "We'll write to {email} when Allfit Studio opens.",
      },
      reset: "Use another email",
      note: "We'll only use your name and email to tell you when we open.",
    },
    tagline: "All the fitness in one place.",
    inceptionMember: "Allfit One is a member of NVIDIA Inception.",
    inceptionBadgeAlt: "NVIDIA Inception Program badge",
    // NVIDIA requires its trademark attribution verbatim, so it stays in English in both languages.
    nvidiaTrademarks:
      "© 2026 NVIDIA, the NVIDIA logo, and NVIDIA Inception are trademarks and/or registered trademarks of NVIDIA Corporation in the U.S. and other countries.",
  },
} as const;

export type LocalizedContent = (typeof content)[Language];

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
    footerSocialTitle: "Follow us",
    rights: "© 2026 Allfit One",
  },
} as const;
