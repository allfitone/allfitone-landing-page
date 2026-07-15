"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CircleDollarSign,
  CreditCard,
  Dumbbell,
  Globe2,
  Layers3,
  LayoutDashboard,
  MessageCircle,
  Menu,
  ShieldCheck,
  Smartphone,
  Users,
  X,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogoMark } from "@/components/logo-mark";
import { cn } from "@/lib/utils";

type Language = "es" | "en";

const pillarIcons = [Globe2, LayoutDashboard, Dumbbell];
const layerIcons = [Globe2, LayoutDashboard, Smartphone];
const signalIcons = [Users, Dumbbell, MessageCircle, CreditCard, Activity, BarChart3];

const content = {
  es: {
    nav: ["Allfit OS", "Cómo funciona", "Precio", "Preguntas"], access: "Solicitar demo", accessShort: "Demo",
    hero: "Creamos el lugar donde personas, entrenamiento y progreso se conectan. El primer paso es", discover: "Descubrir Allfit OS", ecosystem: "Ver el ecosistema", heroKicker: "Un ecosistema para el fitness", firstProduct: "Primer producto", osDescriptor: "El sistema operativo para entrenadores, gimnasios y estudios.", audience: "Entrenadores · Gimnasios · Estudios",
    adherence: "Adherencia", weeklyLoad: "Carga semanal", thisWeek: "+12.4% esta semana", sessionsToday: "Sesiones hoy", inProgress: "6 en curso", athleteAlt: "Atleta entrenando con intensidad",
    osLabel: "Qué es Allfit OS", osTitle: "Todo lo que tu negocio fitness necesita, conectado en un solo sistema.", osCopy: "Allfit OS les da a entrenadores, gimnasios, estudios y marcas de entrenamiento las herramientas para tener presencia digital, gestionar su operación y ofrecer una mejor experiencia a sus clientes sin construir software desde cero.",
    pillars: [["Página pública", "Lanza", "Crea una presencia digital profesional para tu marca de entrenamiento."], ["Panel operativo", "Gestiona", "Administra clientes, planes, rutinas, reservas y actividad del negocio."], ["App cliente", "Entrena", "Dale a tus clientes una experiencia móvil para seguir planes y registrar progreso."]],
    includesLabel: "Qué incluye", layersTitle: "Un sistema. Tres capas conectadas.", layersCopy: "Allfit OS conecta tu marca pública, tu operación interna y la experiencia de tus clientes en una sola plataforma.", signals: ["Clientes", "Rutinas", "WhatsApp", "Pagos", "Progreso", "Métricas"],
    layers: [
      ["Página", "Una página profesional para presentar tus servicios, planes, marca y captar nuevos clientes.", ["Servicios y planes", "Captura de contactos interesados", "Contacto por WhatsApp", "Presentación de marca"]],
      ["Panel de control", "Tu centro de control para gestionar clientes, entrenamientos, reservas y operación.", ["Clientes", "Rutinas", "Reservas", "Pagos o membresías", "Progreso", "Métricas"]],
      ["Aplicación web para clientes", "Una experiencia móvil para que tus clientes puedan entrenar, registrar progreso y mantenerse conectados contigo.", ["Planes de entrenamiento", "Historial de entrenamientos", "Seguimiento de progreso", "Acceso desde el celular", "Conexión con entrenador o gimnasio"]],
    ],
    pricingLabel: "Precio", pricingTitle: "Empieza liviano. Escala cuando tu marca ya mueve volumen.", pricingCopy: "Allfit OS parte de una base mensual y escala principalmente con tus clientes activos y miembros adicionales del equipo.", requestDemo: "Solicitar demostración", trial: "30 días de prueba", entry: "Entrada simple", basePrice: "$30 USD / mes", baseDescription: "Incluye hasta 5 clientes activos y 1 miembro del equipo.", included: "Todo incluido", noLockedFeatures: "Sin funciones bloqueadas", includedDescription: "Rutinas, reservas, pagos, progreso, app, panel, agenda y marca desde el inicio.", model: "Un solo modelo", modelTitle: "El precio crece con tu operación.", modelCopy: "Después de los primeros 5 clientes, el valor por cliente baja por volumen. Los miembros adicionales del equipo se suman aparte desde $15 USD al mes.", tiers: [["6—50 clientes", "$3 / cliente"], ["51—200 clientes", "$2 / cliente"], ["201—500 clientes", "$1.50 / cliente"], ["501—1,000 clientes", "$1.20 / cliente"], ["1,001—3,000 clientes", "$1 / cliente"]], priceDisclaimer: "Precio referencial mensual. Pasarela de pago, mensajes, migraciones, integraciones o soporte dedicado pueden cotizarse aparte según el alcance.",
    faqLabel: "Preguntas frecuentes", faqTitle: "Antes de construir tu plataforma fitness.", faqNotes: ["Página + panel + app", "Acceso móvil sin tienda", "Marca, contacto y operación"], faqs: [["¿Qué es Allfit OS?", "Un sistema operativo digital para negocios fitness. Integra página, panel de control y aplicación web para clientes en una sola plataforma."], ["¿Para quién está pensado?", "Para entrenadores, gimnasios, estudios y marcas de entrenamiento que quieren gestionar y hacer crecer su negocio con una experiencia digital profesional."], ["¿Puedo usar mi propia marca?", "Sí. Allfit OS puede personalizarse con tu logo, colores, contenido y experiencia de marca."], ["¿Mis clientes deben descargar una app?", "No necesariamente. La experiencia puede funcionar como aplicación web desde el celular, sin pasar por una tienda de aplicaciones."], ["¿Incluye configuración inicial?", "Sí. Te ayudamos a configurar tu ecosistema digital para que puedas empezar a usar Allfit OS más rápido."]],
    early: "Acceso anticipado", prepare: "Construye tu ecosistema", operate: "con Allfit OS.", contactCopy: "Solicita una demostración y revisemos si necesitas operar bajo Allfit One o con tu propia marca.",
    next: "Lo siguiente / Allfit One App", hybridTitle: "El atleta híbrido tendrá su lugar.", hybridCopy: "Entrena fuerza. Corre lejos. Compite contra tus límites. Estamos construyendo una experiencia para atletas que no caben en una sola disciplina.",
    phoneToday: "Hoy / Motor híbrido", phoneTitle: "Construye al", phoneTitleAccent: "atleta completo.", todaySession: "Sesión de hoy", runningLoad: "Carga de carrera", strength: "Fuerza",
    built: "Creado para el movimiento",
  },
  en: {
    nav: ["Allfit OS", "How it works", "Pricing", "FAQ"], access: "Request demo", accessShort: "Demo",
    hero: "We are building the place where people, training and progress connect. The first step is", discover: "Discover Allfit OS", ecosystem: "Explore the ecosystem", heroKicker: "One ecosystem for fitness", firstProduct: "First product", osDescriptor: "The operating system for coaches, gyms and studios.", audience: "Coaches · Gyms · Studios",
    adherence: "Adherence", weeklyLoad: "Weekly load", thisWeek: "+12.4% this week", sessionsToday: "Sessions today", inProgress: "6 in progress", athleteAlt: "Athlete training with intensity",
    osLabel: "What is Allfit OS", osTitle: "Everything your fitness business needs, connected in one system.", osCopy: "Allfit OS gives coaches, gyms, studios and training brands the tools to build a digital presence, manage operations and deliver a better client experience without building software from scratch.",
    pillars: [["Public page", "Launch", "Create a professional digital presence for your training brand."], ["Operations dashboard", "Manage", "Run clients, plans, routines, bookings and business activity."], ["Client app", "Train", "Give clients a mobile experience to follow plans and log progress."]],
    includesLabel: "What's included", layersTitle: "One system. Three connected layers.", layersCopy: "Allfit OS connects your public brand, internal operation and client experience in a single platform.", signals: ["Clients", "Routines", "WhatsApp", "Payments", "Progress", "Metrics"],
    layers: [
      ["Page", "A professional page to present services, plans and your brand while capturing new clients.", ["Services and plans", "Lead capture", "WhatsApp contact", "Brand presentation"]],
      ["Control panel", "Your command center for managing clients, training, bookings and operations.", ["Clients", "Routines", "Bookings", "Payments or memberships", "Progress", "Metrics"]],
      ["Client web app", "A mobile experience where clients can train, log progress and stay connected with you.", ["Training plans", "Workout history", "Progress tracking", "Mobile access", "Coach or gym connection"]],
    ],
    pricingLabel: "Pricing", pricingTitle: "Start light. Scale when your brand moves volume.", pricingCopy: "Allfit OS starts with a monthly base and scales mainly with active clients and additional team members.", requestDemo: "Request a demo", trial: "30-day trial", entry: "Simple entry", basePrice: "$30 USD / month", baseDescription: "Includes up to 5 active clients and 1 team member.", included: "All included", noLockedFeatures: "No locked features", includedDescription: "Routines, bookings, payments, progress, app, dashboard, schedule and brand from day one.", model: "One model", modelTitle: "Pricing grows with your operation.", modelCopy: "After the first 5 clients, the per-client rate decreases with volume. Additional team members start at $15 USD per month.", tiers: [["6—50 clients", "$3 / client"], ["51—200 clients", "$2 / client"], ["201—500 clients", "$1.50 / client"], ["501—1,000 clients", "$1.20 / client"], ["1,001—3,000 clients", "$1 / client"]], priceDisclaimer: "Reference monthly price. Payment processing, messages, migrations, integrations or dedicated support may be quoted separately depending on scope.",
    faqLabel: "Frequently asked questions", faqTitle: "Before building your fitness platform.", faqNotes: ["Page + dashboard + app", "Mobile access without a store", "Brand, contact and operations"], faqs: [["What is Allfit OS?", "A digital operating system for fitness businesses. It integrates a page, control panel and client web app in one platform."], ["Who is it for?", "Coaches, gyms, studios and training brands that want to manage and grow their business with a professional digital experience."], ["Can I use my own brand?", "Yes. Allfit OS can be customized with your logo, colors, content and brand experience."], ["Do my clients need to download an app?", "Not necessarily. The client experience can work as a web app on mobile without going through an app store."], ["Does it include initial setup?", "Yes. We help configure your digital ecosystem so you can start using Allfit OS faster."]],
    early: "Early access", prepare: "Build your ecosystem", operate: "with Allfit OS.", contactCopy: "Request a demo and let's review whether you should operate under Allfit One or your own brand.",
    next: "Up next / Allfit One App", hybridTitle: "Hybrid athletes will have their place.", hybridCopy: "Build strength. Run far. Compete against your limits. We are creating an experience for athletes who do not fit into a single discipline.",
    phoneToday: "Today / Hybrid engine", phoneTitle: "Build the", phoneTitleAccent: "complete athlete.", todaySession: "Today's session", runningLoad: "Running load", strength: "Strength",
    built: "Built for movement",
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = content[language];

  useEffect(() => {
    const saved = window.localStorage.getItem("allfitone-language");
    const timer = window.setTimeout(() => {
      if (saved === "en") setLanguage("en");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", menuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("allfitone-language", nextLanguage);
  }

  return (
    <main className="overflow-x-clip bg-void text-white">
      <section id="home" className="hero relative min-h-screen overflow-hidden">
        <nav className="site-grid fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] -translate-x-1/2 items-center rounded-2xl bg-void/86 py-3.5 shadow-[0_18px_55px_rgba(3,7,19,.24)] backdrop-blur-xl" aria-label={language === "es" ? "Navegación principal" : "Main navigation"}>
          <a href="#home" className="brand col-span-6 lg:col-span-3" aria-label={language === "es" ? "Allfit One, inicio" : "Allfit One, home"}>
            <LogoMark />
            <span>ALLFIT <span className="brand-one">ONE</span></span>
          </a>
          <div className="col-span-6 hidden justify-center gap-5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/48 lg:flex">
            <a href="#features" className="nav-link">{t.nav[0]}</a>
            <a href="#how-it-works" className="nav-link">{t.nav[1]}</a>
            <a href="#pricing" className="nav-link">{t.nav[2]}</a>
            <a href="#faq" className="nav-link">{t.nav[3]}</a>
          </div>
          <div className="col-span-6 ml-auto flex items-center gap-3 lg:col-span-3 lg:gap-4">
            <div className="flex rounded-full border border-white/15 p-0.5 text-[8px] font-extrabold" aria-label={language === "es" ? "Seleccionar idioma" : "Select language"}>
              {(["es", "en"] as const).map((item) => <button key={item} type="button" onClick={() => changeLanguage(item)} className={language === item ? "rounded-full bg-bolt px-2 py-1 text-void" : "rounded-full px-2 py-1 text-white/45 transition-colors hover:text-white"} aria-pressed={language === item}>{item.toUpperCase()}</button>)}
            </div>
            <a href="#contact" className="ml-auto hidden items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white sm:flex">
              <span className="lg:hidden">{t.accessShort}</span><span className="hidden lg:inline">{t.access}</span> <ArrowUpRight className="size-4 text-bolt" aria-hidden="true" />
            </a>
            <button type="button" onClick={() => setMenuOpen((open) => !open)} className="ml-auto flex size-9 items-center justify-center rounded-full border border-white/12 text-white transition-colors hover:border-bolt/50 hover:text-bolt sm:ml-0 lg:hidden" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? (language === "es" ? "Cerrar menú" : "Close menu") : (language === "es" ? "Abrir menú" : "Open menu")}>
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>

        {menuOpen ? <div id="mobile-navigation" className="fixed inset-0 z-40 flex h-dvh flex-col justify-between overflow-y-auto bg-void/98 px-6 pb-7 pt-28 backdrop-blur-2xl sm:px-10 lg:hidden">
          <div className="flex flex-col">
            {[["#features", t.nav[0]], ["#how-it-works", t.nav[1]], ["#pricing", t.nav[2]], ["#faq", t.nav[3]]].map(([href, label], index) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="group flex items-center justify-between border-b border-white/10 py-5 font-display text-[clamp(2.5rem,11vw,4.5rem)] font-semibold uppercase leading-none text-white/70 transition-colors hover:text-bolt"><span className="flex items-start gap-4"><span className="mt-1 font-mono text-[9px] tracking-normal text-bolt/60">0{index + 1}</span>{label}</span><ArrowUpRight className="size-6 opacity-35 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100" /></a>)}
          </div>
          <div className="mt-10"><p className="mb-4 text-[9px] font-bold uppercase tracking-[.18em] text-white/30">All the fitness in one place.</p><a href="#contact" onClick={() => setMenuOpen(false)} className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-bolt text-[10px] font-extrabold uppercase tracking-[.16em] text-void">{t.access}<ArrowUpRight className="size-4" /></a></div>
        </div> : null}

        <svg className="hero-brand-mark" viewBox="0 0 405 1149" aria-hidden="true">
          <path d="M405 0 0 211l120 1L11 1149l324-490L405 0Z" />
        </svg>

        <div className="site-grid relative z-20 min-h-screen content-between pb-8 pt-32 md:pb-10 md:pt-40 lg:pt-36">
          <div className="col-span-12 grid grid-cols-12 gap-x-5 md:gap-x-7">
            <div className="col-span-12 mb-8 flex items-center gap-4 md:mb-10">
              <span className="block h-px w-10 bg-bolt" aria-hidden="true" />
              <p className="eyebrow text-bolt">{t.heroKicker}</p>
            </div>

            <div className="col-span-12">
              <h1 className="hero-title-new" aria-label="All the fitness in one place.">
                <span className="block">ALL THE</span>
                <span className="hero-fitness block">FITNESS</span>
                <span className="block text-bolt">IN ONE<span className="hero-place-break"> PLACE.</span></span>
              </h1>
            </div>

            <div className="col-span-12 mt-10 min-w-0 md:col-span-6 md:col-start-2 md:mt-12 lg:col-span-4 lg:col-start-2">
              <p className="hero-copy max-w-lg text-sm leading-6 text-white/58 md:text-base md:leading-7">
                {t.hero} <strong className="font-semibold text-white">Allfit OS</strong>.
              </p>
            </div>
            <div className="col-span-12 mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center md:col-span-5 md:col-start-8 md:mt-12 md:justify-end">
              <a href="#features" className={cn(buttonVariants({ size: "lg" }), "h-13 rounded-full bg-bolt px-6 text-[10px] font-extrabold uppercase tracking-[0.16em] text-void hover:bg-bolt/85")}>
                {t.discover} <ArrowDown data-icon="inline-end" />
              </a>
              <a href="#how-it-works" className="flex items-center gap-2 px-3 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-white">
                {t.ecosystem} <ArrowRight className="size-4" />
              </a>
            </div>
          </div>

          <div className="col-span-12 mt-16 grid min-w-0 grid-cols-12 border-y border-white/12 md:mt-20">
            <div className="col-span-12 flex items-center gap-4 py-4 md:col-span-3 md:border-r md:border-white/12 md:pr-6">
              <span className="font-mono text-[9px] text-bolt">01</span>
              <span className="eyebrow text-white/35">{t.firstProduct}</span>
            </div>
            <div className="col-span-12 flex items-center justify-between border-t border-white/12 py-5 md:col-span-5 md:border-t-0 md:px-7">
              <strong className="font-display text-3xl font-semibold uppercase tracking-[-.035em]">Allfit OS</strong>
              <ArrowUpRight className="size-5 text-bolt" aria-hidden="true" />
            </div>
            <div className="col-span-12 border-t border-white/12 py-5 md:col-span-4 md:border-l md:border-t-0 md:border-white/12 md:pl-7">
              <p className="text-xs leading-5 text-white/50">{t.osDescriptor}</p>
              <p className="mt-2 text-[8px] font-bold uppercase tracking-[.16em] text-bolt/70">{t.audience}</p>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-gradient-to-r from-transparent via-bolt/60 to-transparent" />
      </section>

      <section id="features" className="relative overflow-hidden bg-chalk py-24 text-void md:py-36">
        <div className="site-grid items-end">
          <div className="col-span-12 md:col-span-3"><p className="eyebrow text-void/45">{t.osLabel}</p></div>
          <div className="col-span-12 mt-6 md:col-span-9 md:mt-0">
            <h2 className="section-title max-w-5xl">{t.osTitle}</h2>
            <p className="mt-8 max-w-3xl text-base leading-7 text-void/60 md:text-lg">{t.osCopy}</p>
          </div>
        </div>
        <div className="site-grid mt-16 md:mt-24">
          {t.pillars.map(([signal, title, description], index) => {
            const Icon = pillarIcons[index];
            return <article key={title} className="col-span-12 border-t border-void/15 py-8 md:col-span-4 md:min-h-72 md:border-l md:border-t-0 md:px-7 first:md:border-l-0">
              <div className="flex items-center justify-between"><Icon className="size-6 text-turquoise-dark" /><span className="font-mono text-[10px] text-void/30">0{index + 1}</span></div>
              <p className="mt-10 text-[9px] font-extrabold uppercase tracking-[.18em] text-turquoise-dark">{signal}</p>
              <h3 className="mt-3 font-display text-5xl font-semibold uppercase leading-none">{title}</h3>
              <p className="mt-5 max-w-sm text-sm leading-6 text-void/55">{description}</p>
            </article>;
          })}
        </div>
      </section>

      <section id="how-it-works" className="bg-void py-24 md:py-32">
        <div className="site-grid items-end">
          <div className="col-span-12 md:col-span-4"><p className="eyebrow text-white/35">{t.includesLabel}</p></div>
          <div className="col-span-12 mt-6 md:col-span-8 md:mt-0"><h2 className="section-title max-w-4xl">{t.layersTitle}</h2><p className="mt-7 max-w-2xl text-base leading-7 text-white/45">{t.layersCopy}</p></div>
        </div>
        <div className="site-grid mt-12">
          <div className="col-span-12 flex flex-wrap gap-2 md:col-start-5 md:col-span-8">
            {t.signals.map((signal, index) => { const Icon = signalIcons[index]; return <span key={signal} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[.035] px-3 py-2 text-[10px] font-bold text-white/50"><Icon className="size-3.5 text-bolt" />{signal}</span>; })}
          </div>
        </div>
        <div className="site-grid mt-14">
          {t.layers.map(([title, description, items], index) => {
            const Icon = layerIcons[index];
            return <article key={title} className={index === 1 ? "col-span-12 rounded-2xl border border-bolt/35 bg-bolt/6 p-6 md:col-span-4 md:p-7" : "col-span-12 rounded-2xl border border-white/10 bg-panel/65 p-6 md:col-span-4 md:p-7"}>
              <div className="flex items-center justify-between"><span className="flex size-11 items-center justify-center rounded-xl bg-bolt/10 text-bolt"><Icon className="size-5" /></span><span className="font-display text-4xl text-white/15">0{index + 1}</span></div>
              <p className="mt-8 text-[9px] font-extrabold uppercase tracking-[.18em] text-bolt">{language === "es" ? "Capa conectada" : "Connected layer"}</p>
              <h3 className="mt-3 font-display text-4xl font-semibold uppercase leading-none">{title}</h3>
              <p className="mt-5 text-sm leading-6 text-white/45">{description}</p>
              <ul className="mt-7 flex flex-col gap-3">{items.map((item) => <li key={item} className="flex items-start gap-3 text-sm text-white/65"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-bolt" />{item}</li>)}</ul>
            </article>;
          })}
        </div>
      </section>

      <section id="pricing" className="bg-panel py-24 md:py-32">
        <div className="site-grid items-end">
          <div className="col-span-12 md:col-span-7"><p className="eyebrow text-bolt">{t.pricingLabel}</p><h2 className="section-title mt-7 max-w-4xl">{t.pricingTitle}</h2></div>
          <div className="col-span-12 mt-8 md:col-span-5 md:mt-0"><p className="max-w-xl text-sm leading-6 text-white/45">{t.pricingCopy}</p><div className="mt-6 flex items-center gap-4"><a href="mailto:hello@allfitone.com" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full bg-bolt px-6 text-[10px] font-extrabold uppercase tracking-[.15em] text-void hover:bg-cyan-light")}>{t.requestDemo}<ArrowUpRight data-icon="inline-end" /></a><span className="text-[10px] font-bold uppercase tracking-[.14em] text-white/40">{t.trial}</span></div></div>
        </div>
        <div className="site-grid mt-14">
          <div className="col-span-12 rounded-2xl border border-white/10 bg-void p-6 md:col-span-5 md:p-8"><CircleDollarSign className="size-6 text-bolt" /><p className="mt-8 text-[9px] font-extrabold uppercase tracking-[.18em] text-bolt">{t.entry}</p><p className="mt-3 font-display text-5xl font-semibold uppercase">{t.basePrice}</p><p className="mt-4 text-sm text-white/45">{t.baseDescription}</p></div>
          <div className="col-span-12 mt-4 rounded-2xl border border-bolt/25 bg-bolt/6 p-6 md:col-span-7 md:mt-0 md:p-8"><ShieldCheck className="size-6 text-bolt" /><p className="mt-8 text-[9px] font-extrabold uppercase tracking-[.18em] text-bolt">{t.included}</p><p className="mt-3 font-display text-5xl font-semibold uppercase">{t.noLockedFeatures}</p><p className="mt-4 text-sm text-white/45">{t.includedDescription}</p></div>
        </div>
        <div className="site-grid mt-5">
          <div className="col-span-12 rounded-2xl border border-white/10 bg-void/70 p-6 md:p-8">
            <div className="grid gap-7 md:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow text-bolt">{t.model}</p><h3 className="mt-5 font-display text-4xl font-semibold uppercase leading-none">{t.modelTitle}</h3><p className="mt-4 text-sm leading-6 text-white/45">{t.modelCopy}</p></div><div className="grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-5">{t.tiers.map(([range, price]) => <div key={range} className="bg-panel p-4"><p className="text-[9px] font-bold uppercase tracking-[.12em] text-white/35">{range}</p><p className="mt-4 text-sm font-extrabold text-bolt">{price}</p></div>)}</div></div>
          </div>
          <p className="col-span-12 mt-5 text-center text-[10px] leading-5 text-white/30">{t.priceDisclaimer}</p>
        </div>
      </section>

      <section id="faq" className="bg-chalk py-24 text-void md:py-32">
        <div className="site-grid items-start">
          <div className="col-span-12 md:col-span-4"><p className="eyebrow text-turquoise-dark">{t.faqLabel}</p><h2 className="section-title mt-6">{t.faqTitle}</h2><div className="mt-8 flex flex-col gap-3">{t.faqNotes.map((note, index) => { const Icon = [Layers3, Smartphone, MessageCircle][index]; return <span key={note} className="flex items-center gap-3 text-sm text-void/55"><Icon className="size-4 text-turquoise-dark" />{note}</span>; })}</div></div>
          <div className="col-span-12 mt-10 md:col-span-8 md:mt-0 md:pl-10">{t.faqs.map(([question, answer], index) => <details key={question} className="group border-t border-void/15 last:border-b"><summary className="flex cursor-pointer list-none items-center gap-5 py-6 font-display text-2xl font-semibold uppercase"><span className="font-mono text-[10px] text-turquoise-dark">0{index + 1}</span><span className="flex-1">{question}</span><span className="relative size-6 after:absolute after:left-1/2 after:top-1/2 after:h-px after:w-4 after:-translate-x-1/2 after:bg-void before:absolute before:left-1/2 before:top-1/2 before:h-4 before:w-px before:-translate-y-1/2 before:bg-void before:transition-transform group-open:before:scale-y-0" /></summary><p className="max-w-2xl pb-7 pl-10 text-sm leading-7 text-void/55">{answer}</p></details>)}</div>
        </div>
      </section>

      <section id="contact" className="bg-void py-24 text-white md:py-32">
        <div className="site-grid items-end"><div className="col-span-12 md:col-span-8"><p className="eyebrow text-bolt">{t.early}</p><h2 className="section-title mt-6">{t.prepare}<br /><span className="text-bolt">{t.operate}</span></h2></div><div className="col-span-12 mt-10 md:col-span-4 md:mt-0"><p className="mb-7 text-sm leading-6 text-white/45">{t.contactCopy}</p><a href="mailto:hello@allfitone.com" className={cn(buttonVariants({ size: "lg" }), "h-14 w-full rounded-full bg-bolt px-6 text-[10px] font-extrabold uppercase tracking-[.16em] text-void hover:bg-cyan-light")}>{t.requestDemo}<ArrowUpRight data-icon="inline-end" /></a></div></div>
      </section>

      <section id="upcoming" className="relative overflow-hidden bg-bolt py-24 text-void md:py-32">
        <div className="absolute -right-28 top-1/2 size-[500px] -translate-y-1/2 rounded-full border-[80px] border-void/7 md:size-[760px]" />
        <div className="site-grid relative z-10 items-center"><div className="col-span-12 md:col-span-7"><p className="eyebrow text-void/45">{t.next}</p><h2 className="section-title mt-7 max-w-3xl">{t.hybridTitle}</h2><p className="mt-7 max-w-lg text-sm leading-6 text-void/60">{t.hybridCopy}</p></div><div className="col-span-12 mt-12 md:col-span-5 md:mt-0"><div className="phone-shell mx-auto w-[270px] rotate-[5deg] rounded-[42px] border-[8px] border-void bg-void p-2 shadow-[0_35px_60px_rgba(3,7,19,.25)]"><div className="min-h-[510px] overflow-hidden rounded-[30px] bg-panel p-5 text-white"><div className="mx-auto h-4 w-20 rounded-full bg-black" /><p className="mt-9 text-[9px] uppercase tracking-[.17em] text-white/35">{t.phoneToday}</p><h3 className="mt-2 font-display text-4xl font-semibold uppercase leading-[.88]">{t.phoneTitle}<br /><span className="text-bolt">{t.phoneTitleAccent}</span></h3><div className="mt-8 rounded-2xl bg-bolt p-4 text-void"><p className="text-[8px] font-bold uppercase tracking-[.14em]">{t.todaySession}</p><p className="mt-5 text-xl font-bold">Engine + Lower</p><div className="mt-5 flex items-center justify-between text-[9px] font-semibold"><span>52 min</span><span className="flex size-8 items-center justify-center rounded-full bg-void text-bolt"><ArrowRight className="size-4" /></span></div></div><div className="mt-3 grid grid-cols-2 gap-3"><div className="rounded-xl bg-white/6 p-4"><p className="text-[8px] text-white/35">{t.runningLoad}</p><strong className="mt-3 block text-2xl">32.4</strong></div><div className="rounded-xl bg-white/6 p-4"><p className="text-[8px] text-white/35">{t.strength}</p><strong className="mt-3 block text-2xl">84%</strong></div></div></div></div></div></div>
      </section>

      <footer className="bg-void px-5 pb-7 pt-16 text-white md:px-8 md:pt-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between"><div className="brand text-xl"><LogoMark /><span>ALLFIT <span className="brand-one">ONE</span></span></div><p className="max-w-sm text-sm leading-6 text-white/40">All the fitness in one place.</p></div>
          <p className="footer-word mt-20 text-center">ALLFIT ONE</p>
          <Separator className="mt-10 bg-white/10" />
          <div className="mt-5 flex justify-between text-[8px] font-bold uppercase tracking-[.16em] text-white/25"><span>© 2026 Allfit One</span><span>{t.built}</span></div>
        </div>
      </footer>
    </main>
  );
}
