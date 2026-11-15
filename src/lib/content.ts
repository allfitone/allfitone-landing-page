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
    footerLegal: "Legal",
    heroLead:
      "Cambias de entrenador, de gimnasio o de app y tu historial se queda atrás. Estamos construyendo Allfit One para que se quede contigo: Allfit Space para quien entrena, Allfit Studio para quien acompaña y gestiona.",
    heroAction: "Únete a la lista de Allfit Space",

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
    spacePhoneAlt: "Sesión en curso en Allfit Space: las series de dominadas, con lo que levantaste la vez anterior.",

    studioSectionLabel: "Allfit Studio",
    studioSectionTitle: "Organiza tu negocio sin perder de vista a tus clientes.",
    studioSectionCopy:
      "Studio trabaja sobre el Fitness ID de cada persona: planificas, sigues su progreso y llevas tu operación sin pedirle que empiece de cero.",
    studioWindowAlt:
      "Allfit Studio, pantalla Cobros: quién paga, en qué plan está cada persona y cuándo es su próximo cobro.",

    statusLabel: "Lista de espera",
    statusTitle: "Estamos construyendo Allfit One.",
    statusTitleLead: "Estamos construyendo",
    statusCopy: "Allfit Space tiene lista de espera. Únete y te avisamos cuando abra.",
    // The launch offer, stated once; its terms live on the waitlist page on space.allfit.one.
    waitlistOffer: "Las primeras 100 personas que confirmen su correo serán sus Founding Members.",
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
    footerLegal: "Legal",
    heroLead:
      "You change coach, gym or app, and your history stays behind. We're building Allfit One so it stays with you: Allfit Space for the people who train, Allfit Studio for the people who coach and run the work.",
    heroAction: "Join the Allfit Space waitlist",

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
    spacePhoneAlt: "A session in progress in Allfit Space: the pull-up sets, with what you lifted last time.",

    studioSectionLabel: "Allfit Studio",
    studioSectionTitle: "Run your business without losing sight of your clients.",
    studioSectionCopy:
      "Studio works on each person's Fitness ID: you plan, follow their progress and run your operation without asking them to start over.",
    studioWindowAlt:
      "Allfit Studio, Billing screen: who pays, which plan each person is on and when their next charge is.",

    statusLabel: "Waitlist",
    statusTitle: "We're building Allfit One.",
    statusTitleLead: "We're building",
    statusCopy: "Allfit Space has a waitlist. Join it and we'll let you know when it opens.",
    waitlistOffer: "The first 100 people to confirm their email become its Founding Members.",
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
