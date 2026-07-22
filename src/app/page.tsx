"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  CreditCard,
  Dumbbell,
  Globe2,
  LayoutDashboard,
  Menu,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

import { LogoMark } from "@/components/logo-mark";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Language = "es" | "en";

const content = {
  es: {
    navOs: "Allfit OS",
    navSpace: "Allfit Space",
    navEcosystem: "Ecosistema",
    requestDemo: "Solicitar demo",
    requestDemoShort: "Demo",
    heroCopy:
      "Allfit One conecta personas, profesionales y organizaciones en un mismo ecosistema.",
    appAudience: "Para personas",
    appDescription: "Entrena por tu cuenta o con un profesional y lleva tu progreso contigo.",
    comingSoon: "Próximamente",
    osAudience: "Para profesionales y organizaciones",
    osDescription:
      "Gestiona clientes, entrenamientos, agenda, membresías y progreso desde un solo panel.",
    phoneToday: "Hoy",
    phoneGreeting: "Tu siguiente paso",
    phoneSession: "Fuerza · Tren superior",
    phoneLocation: "18:00 · Allfit Performance",
    phoneRecovery: "Recuperación moderada",
    phoneDuration: "72 min",
    phoneStart: "Comenzar entrenamiento",
    phoneWeek: "Semana",
    phoneAdherence: "Adherencia",
    dashboardOverview: "Resumen",
    dashboardGreeting: "Así se mueve tu operación hoy.",
    dashboardNavigation: ["Resumen", "Clientes", "Entrenamientos", "Agenda", "Membresías", "Página pública"],
    dashboardActiveClients: "Clientes activos",
    dashboardSessions: "Sesiones hoy",
    dashboardAdherence: "Adherencia",
    dashboardAgenda: "Agenda de hoy",
    dashboardActivity: "Actividad reciente",
    dashboardViewAll: "Ver agenda",
    dashboardSchedule: [
      ["07:00", "Fuerza · Grupo 04", "8 atletas"],
      ["10:30", "Evaluación inicial", "Laura Méndez"],
      ["18:00", "Engine · Intermedio", "12 atletas"],
    ],
    dashboardUpdates: [
      ["Mariana completó su sesión", "Hace 8 min"],
      ["Nuevo cliente asignado", "Hace 21 min"],
      ["Pago de membresía registrado", "Hace 34 min"],
    ],
    appSectionLabel: "Allfit Space",
    appSectionTitle: "Tu progreso no debería empezar de cero cada vez.",
    appSectionCopy:
      "Una experiencia personal para entrenar por tu cuenta o con profesionales, conservar tu progreso y conectarte con gimnasios, membresías y servicios desde una misma identidad.",
    appPillars: [
      ["Entrena", "Organiza rutinas, registra sesiones y entiende tu progreso sin importar dónde entrenes."],
      ["Conecta", "Trabaja con profesionales y vincula gimnasios o membresías sin fragmentar tu experiencia."],
      ["Lleva tu historia", "Tus objetivos, resultados y relaciones permanecen contigo cuando cambias de disciplina, entrenador o lugar."],
    ],
    appAreasLabel: "Una experiencia que se adapta a ti",
    appAreas: [
      ["Hoy", "Tu plan diario"],
      ["Entrena", "Entrenamiento y progreso"],
      ["Explora", "Profesionales y lugares"],
      ["Comunidad", "Personas que entrenan"],
      ["Tú", "Tu identidad fitness"],
    ],
    appVision: "Visión de producto · Próximamente",
    osSectionLabel: "Allfit OS",
    osSectionTitle: "La operación detrás de cada experiencia.",
    osSectionCopy:
      "Un panel administrativo para que entrenadores, gimnasios, estudios y centros deportivos gestionen su operación y acompañen el progreso de las personas desde un solo lugar.",
    osModulesLabel: "Todo ocurre dentro del panel",
    osModules: [
      ["Clientes", "Perfiles, relaciones y seguimiento"],
      ["Entrenamientos", "Planes, rutinas y asignaciones"],
      ["Agenda", "Sesiones, clases y reservas"],
      ["Membresías", "Planes, pagos y vigencias"],
      ["Progreso", "Actividad, adherencia y resultados"],
      ["Página pública", "Servicios, horarios y contacto"],
    ],
    ecosystemLabel: "Ecosistema",
    ecosystemTitle: "Dos productos. Una sola relación.",
    ecosystemCopy:
      "La App acompaña a la persona. OS organiza a quienes hacen posible su experiencia. Allfit One conecta ambos lados con identidad, permisos e información compartida.",
    ecosystemRows: [
      ["La persona entrena", "El profesional programa"],
      ["La persona reserva", "La organización publica"],
      ["La persona registra progreso", "El profesional analiza"],
      ["La persona conserva su historia", "La organización accede con permiso"],
    ],
    built: "Creado para el movimiento",
  },
  en: {
    navOs: "Allfit OS",
    navSpace: "Allfit Space",
    navEcosystem: "Ecosystem",
    requestDemo: "Request demo",
    requestDemoShort: "Demo",
    heroCopy:
      "Allfit One connects people, professionals and organizations in one ecosystem.",
    appAudience: "For people",
    appDescription: "Train on your own or with a professional and keep your progress with you.",
    comingSoon: "Coming soon",
    osAudience: "For professionals and organizations",
    osDescription: "Manage clients, training, schedules, memberships and progress from one dashboard.",
    phoneToday: "Today",
    phoneGreeting: "Your next move",
    phoneSession: "Strength · Upper body",
    phoneLocation: "18:00 · Allfit Performance",
    phoneRecovery: "Moderate recovery",
    phoneDuration: "72 min",
    phoneStart: "Start workout",
    phoneWeek: "Week",
    phoneAdherence: "Adherence",
    dashboardOverview: "Overview",
    dashboardGreeting: "This is how your operation moves today.",
    dashboardNavigation: ["Overview", "Clients", "Training", "Schedule", "Memberships", "Public page"],
    dashboardActiveClients: "Active clients",
    dashboardSessions: "Sessions today",
    dashboardAdherence: "Adherence",
    dashboardAgenda: "Today's schedule",
    dashboardActivity: "Recent activity",
    dashboardViewAll: "View schedule",
    dashboardSchedule: [
      ["07:00", "Strength · Group 04", "8 athletes"],
      ["10:30", "Initial assessment", "Laura Méndez"],
      ["18:00", "Engine · Intermediate", "12 athletes"],
    ],
    dashboardUpdates: [
      ["Mariana completed her session", "8 min ago"],
      ["New client assigned", "21 min ago"],
      ["Membership payment recorded", "34 min ago"],
    ],
    appSectionLabel: "Allfit Space",
    appSectionTitle: "Your progress should not start over every time.",
    appSectionCopy:
      "A personal experience to train independently or with professionals, keep your progress and connect with gyms, memberships and services through one identity.",
    appPillars: [
      ["Train", "Organize routines, log sessions and understand your progress wherever you train."],
      ["Connect", "Work with professionals and link gyms or memberships without fragmenting your experience."],
      ["Carry your history", "Your goals, results and relationships stay with you when you change discipline, coach or place."],
    ],
    appAreasLabel: "An experience that adapts to you",
    appAreas: [
      ["Today", "Your daily plan"],
      ["Train", "Training and progress"],
      ["Explore", "Professionals and places"],
      ["Community", "People who train"],
      ["You", "Your fitness identity"],
    ],
    appVision: "Product vision · Coming soon",
    osSectionLabel: "Allfit OS",
    osSectionTitle: "The operation behind every experience.",
    osSectionCopy:
      "An administrative dashboard for coaches, gyms, studios and sports centers to manage their operation and support people's progress from one place.",
    osModulesLabel: "Everything happens inside the dashboard",
    osModules: [
      ["Clients", "Profiles, relationships and follow-up"],
      ["Training", "Plans, routines and assignments"],
      ["Schedule", "Sessions, classes and bookings"],
      ["Memberships", "Plans, payments and validity"],
      ["Progress", "Activity, adherence and results"],
      ["Public page", "Services, hours and contact"],
    ],
    ecosystemLabel: "Ecosystem",
    ecosystemTitle: "Two products. One relationship.",
    ecosystemCopy:
      "The App stays with the person. OS organizes the people who make their experience possible. Allfit One connects both sides through identity, permissions and shared information.",
    ecosystemRows: [
      ["The person trains", "The professional programs"],
      ["The person books", "The organization publishes"],
      ["The person logs progress", "The professional analyzes"],
      ["The person keeps their history", "The organization accesses it with permission"],
    ],
    built: "Built for movement",
  },
} as const;

type LocalizedContent = (typeof content)[Language];

const dashboardIcons = [LayoutDashboard, Users, Dumbbell, CalendarDays, CreditCard, Globe2];
const appPillarIcons = [Dumbbell, Users, TrendingUp];
const osModuleIcons = [Users, Dumbbell, CalendarDays, CreditCard, Activity, Globe2];

function PhoneMockup({ copy }: { copy: LocalizedContent }) {
  return (
    <div className="phone-shell product-phone" aria-hidden="true">
      <div className="phone-screen">
        <div className="phone-island" aria-hidden="true" />
        <div className="mt-8 flex items-end justify-between">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[.18em] text-white/35">{copy.phoneGreeting}</p>
            <p className="mt-1 font-display text-[2.65rem] font-semibold uppercase leading-none">{copy.phoneToday}</p>
          </div>
          <span className="flex size-9 items-center justify-center rounded-full border border-white/10 text-bolt">
            <Activity className="size-4" aria-hidden="true" />
          </span>
        </div>

        <div className="mt-7 border-y border-white/10 py-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[8px] font-bold uppercase tracking-[.16em] text-bolt">{copy.phoneRecovery}</p>
            <span className="font-mono text-[8px] text-white/35">68%</span>
          </div>
          <div className="mt-3 h-px bg-white/10">
            <div className="h-px w-[68%] bg-bolt" />
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-bolt p-5 text-void">
          <div className="flex items-center justify-between">
            <p className="text-[8px] font-extrabold uppercase tracking-[.16em]">{copy.phoneSession}</p>
            <Dumbbell className="size-4" aria-hidden="true" />
          </div>
          <p className="mt-3 text-[10px] font-semibold text-void/65">{copy.phoneLocation}</p>
          <div className="mt-8 flex items-center justify-between border-t border-void/15 pt-4">
            <span className="flex items-center gap-1.5 text-[9px] font-bold">
              <Clock3 className="size-3.5" aria-hidden="true" />
              {copy.phoneDuration}
            </span>
            <ChevronRight className="size-4" aria-hidden="true" />
          </div>
        </div>

        <div className="mt-3 flex h-11 w-full items-center justify-between rounded-full border border-white/15 px-4 text-left text-[8px] font-extrabold uppercase tracking-[.14em] text-white">
          {copy.phoneStart}
          <ArrowUpRight className="size-3.5 text-bolt" aria-hidden="true" />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
          <div className="bg-white/[.035] p-4">
            <p className="text-[7px] uppercase tracking-[.14em] text-white/35">{copy.phoneWeek}</p>
            <strong className="mt-2 block text-lg">4 / 5</strong>
          </div>
          <div className="bg-white/[.035] p-4">
            <p className="text-[7px] uppercase tracking-[.14em] text-white/35">{copy.phoneAdherence}</p>
            <strong className="mt-2 block text-lg text-bolt">87%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function OsDashboardMockup({ copy }: { copy: LocalizedContent }) {
  return (
    <div className="os-shell" aria-hidden="true">
      <div className="os-topbar">
        <div className="flex items-center gap-2.5">
          <LogoMark className="small" />
          <span className="font-display text-sm font-bold tracking-[-.02em]">ALLFIT <span className="text-bolt">OS</span></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden text-[7px] font-bold uppercase tracking-[.16em] text-white/30 sm:block">Allfit Performance</span>
          <span className="flex size-7 items-center justify-center rounded-full bg-bolt font-display text-xs font-bold text-void">AP</span>
        </div>
      </div>

      <div className="os-workspace">
        <aside className="os-sidebar">
          {copy.dashboardNavigation.map((item, index) => {
            const Icon = dashboardIcons[index];
            return (
              <div key={item} className={cn("os-nav-item", index === 0 && "os-nav-item-active")}>
                <Icon className="size-3.5" aria-hidden="true" />
                <span>{item}</span>
              </div>
            );
          })}
        </aside>

        <div className="os-main">
          <header className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[7px] font-bold uppercase tracking-[.17em] text-bolt">Allfit OS</p>
              <p className="mt-1 font-display text-2xl font-semibold uppercase leading-none sm:text-3xl">{copy.dashboardOverview}</p>
              <p className="mt-2 hidden text-[8px] text-white/35 sm:block">{copy.dashboardGreeting}</p>
            </div>
            <span className="hidden items-center gap-1.5 text-[7px] font-semibold text-white/35 md:flex">
              <CalendarDays className="size-3" aria-hidden="true" />
              17 Jul 2026
            </span>
          </header>

          <div className="os-stat-grid">
            {[
              [copy.dashboardActiveClients, "128", Users],
              [copy.dashboardSessions, "24", Activity],
              [copy.dashboardAdherence, "87%", TrendingUp],
            ].map(([label, value, Icon]) => (
              <article key={String(label)} className="os-stat">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[6px] font-bold uppercase tracking-[.14em] text-white/30 sm:text-[7px]">{String(label)}</p>
                  <Icon className="size-3 text-bolt" aria-hidden="true" />
                </div>
                <strong className="mt-3 block font-display text-2xl font-semibold leading-none sm:text-3xl">{String(value)}</strong>
              </article>
            ))}
          </div>

          <div className="os-content-grid">
            <section className="os-panel">
              <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-3">
                <p className="text-[8px] font-bold uppercase tracking-[.15em] text-white/65">{copy.dashboardAgenda}</p>
                <span className="text-[6px] font-bold uppercase tracking-[.12em] text-bolt">{copy.dashboardViewAll}</span>
              </div>
              <div className="flex flex-col">
                {copy.dashboardSchedule.map(([time, session, detail]) => (
                  <div key={`${time}-${session}`} className="grid grid-cols-[38px_1fr_auto] items-center gap-2 border-b border-white/6 py-3 last:border-b-0">
                    <span className="font-mono text-[7px] text-bolt">{time}</span>
                    <strong className="truncate text-[8px] font-semibold text-white/75">{session}</strong>
                    <span className="hidden text-[7px] text-white/30 sm:block">{detail}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="os-panel os-activity-panel">
              <p className="border-b border-white/8 pb-3 text-[8px] font-bold uppercase tracking-[.15em] text-white/65">{copy.dashboardActivity}</p>
              <div className="flex flex-col">
                {copy.dashboardUpdates.map(([update, time]) => (
                  <div key={update} className="flex gap-2.5 border-b border-white/6 py-3 last:border-b-0">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-bolt" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="truncate text-[7px] font-semibold text-white/65">{update}</p>
                      <p className="mt-1 text-[6px] text-white/25">{time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = content[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("allfitone-language");
    const timer = window.setTimeout(() => {
      if (savedLanguage === "en") setLanguage("en");
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("allfitone-language", nextLanguage);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="min-h-screen overflow-x-clip bg-void text-white">
      <section id="home" className="hero relative overflow-hidden">
        <nav className="site-grid fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] -translate-x-1/2 items-center rounded-2xl bg-void/86 py-3.5 shadow-[0_18px_55px_rgba(3,7,19,.24)] backdrop-blur-xl" aria-label={language === "es" ? "Navegación principal" : "Main navigation"}>
          <a href="#home" className="col-span-6 flex min-h-11 items-center lg:col-span-3" aria-label={language === "es" ? "Allfit One, inicio" : "Allfit One, home"}>
            <Image
              src="/brand/reusable/lockup/allfit-one-lockup-on-dark.svg"
              alt=""
              width={1678}
              height={480}
              className="h-8 w-auto"
              aria-hidden="true"
            />
          </a>

          <div className="col-span-6 hidden justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.16em] text-white/48 lg:flex">
            <a href="#allfit-space" className="nav-link inline-flex min-h-11 items-center">{copy.navSpace}</a>
            <a href="#allfit-os" className="nav-link inline-flex min-h-11 items-center">{copy.navOs}</a>
            <a href="#ecosystem" className="nav-link inline-flex min-h-11 items-center">{copy.navEcosystem}</a>
          </div>

          <div className="col-span-6 ml-auto flex items-center gap-3 lg:col-span-3 lg:gap-4">
            <div className="hidden rounded-full border border-white/15 text-[8px] font-extrabold min-[400px]:flex" aria-label={language === "es" ? "Seleccionar idioma" : "Select language"}>
              {(["es", "en"] as const).map((item) => (
                <button key={item} type="button" onClick={() => changeLanguage(item)} className={language === item ? "flex size-11 items-center justify-center rounded-full bg-bolt text-void" : "flex size-11 items-center justify-center rounded-full text-white/45 transition-colors hover:text-white"} aria-pressed={language === item}>
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
            <a href="mailto:hello@allfitone.com" className="ml-auto hidden min-h-11 items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white sm:flex">
              <span className="lg:hidden">{copy.requestDemoShort}</span>
              <span className="hidden lg:inline">{copy.requestDemo}</span>
              <ArrowUpRight className="size-4 text-bolt" aria-hidden="true" />
            </a>
            <button type="button" onClick={() => setMenuOpen((open) => !open)} className="ml-auto flex size-11 items-center justify-center rounded-full border border-white/12 text-white transition-colors hover:border-bolt/50 hover:text-bolt sm:ml-0 lg:hidden" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? (language === "es" ? "Cerrar menú" : "Close menu") : (language === "es" ? "Abrir menú" : "Open menu")}>
              {menuOpen ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {menuOpen ? (
          <div id="mobile-navigation" className="fixed inset-0 z-40 flex h-dvh flex-col justify-between overflow-y-auto bg-void/98 px-6 pb-7 pt-28 backdrop-blur-2xl sm:px-10 lg:hidden">
            <div className="flex flex-col">
              {[
                ["#allfit-space", copy.navSpace, copy.appAudience],
                ["#allfit-os", copy.navOs, copy.osAudience],
                ["#ecosystem", copy.navEcosystem, copy.ecosystemLabel],
              ].map(([href, label, audience]) => (
                <a key={href} href={href} onClick={closeMenu} className="group flex items-end justify-between gap-6 border-b border-white/10 py-6 font-display text-[clamp(2.8rem,12vw,5rem)] font-semibold uppercase leading-none text-white/70 transition-colors hover:text-bolt">
                  <span>{label}</span>
                  <span className="mb-1 hidden max-w-40 text-right font-sans text-[8px] font-bold uppercase leading-4 tracking-[.16em] text-white/30 sm:block">{audience}</span>
                </a>
              ))}
            </div>
            <div className="mt-10">
              <div className="mb-6 flex w-fit rounded-full border border-white/15 text-[9px] font-extrabold min-[400px]:hidden" aria-label={language === "es" ? "Seleccionar idioma" : "Select language"}>
                {(["es", "en"] as const).map((item) => (
                  <button key={item} type="button" onClick={() => changeLanguage(item)} className={language === item ? "flex size-11 items-center justify-center rounded-full bg-bolt text-void" : "flex size-11 items-center justify-center rounded-full text-white/45 transition-colors hover:text-white"} aria-pressed={language === item}>
                    {item.toUpperCase()}
                  </button>
                ))}
              </div>
              <p className="mb-4 text-[9px] font-bold uppercase tracking-[.18em] text-white/30">All the fitness in one place.</p>
              <a href="mailto:hello@allfitone.com" onClick={closeMenu} className={cn(buttonVariants({ size: "lg" }), "h-14 w-full rounded-full bg-bolt px-6 text-[10px] font-extrabold uppercase tracking-[.16em] text-void hover:bg-cyan-light")}>
                {copy.requestDemo}
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </div>
          </div>
        ) : null}

        <svg className="hero-brand-mark" viewBox="0 0 405 1149" aria-hidden="true">
          <path d="M405 0 0 211l120 1L11 1149l324-490L405 0Z" />
        </svg>

        <div className="site-grid relative z-20 pb-24 pt-32 md:pb-28 md:pt-40 lg:pt-36">
          <div className="col-span-12 mt-6 md:mt-8">
            <h1 className="hero-title-new" aria-label="All the fitness in one place.">
              <span className="block">ALL THE</span>
              <span className="hero-fitness block">FITNESS</span>
              <span className="block text-bolt">IN ONE<span className="hero-place-break"> PLACE.</span></span>
            </h1>
          </div>

          <div className="col-span-12 mt-10 md:col-span-7 md:mt-12 lg:col-span-5">
            <p className="hero-copy max-w-xl text-sm leading-6 text-white/58 md:text-base md:leading-7">{copy.heroCopy}</p>
          </div>

          <div className="product-stage col-span-12 mt-20 md:mt-28 lg:mt-32">
            <div className="product-stage-visual">
              <div className="app-visual-anchor">
                <PhoneMockup copy={copy} />
              </div>
              <div className="os-visual-anchor">
                <OsDashboardMockup copy={copy} />
              </div>
            </div>

            <div className="product-definitions">
              <article className="product-definition product-definition-app">
                <p className="eyebrow text-bolt">{copy.appAudience}</p>
                <h2 className="mt-4 font-display text-5xl font-semibold uppercase leading-none tracking-[-.04em] md:text-6xl">Allfit Space</h2>
                <p className="mt-5 max-w-md text-sm leading-6 text-white/48">{copy.appDescription}</p>
                <div className="mt-8 flex items-center gap-3">
                  <span className="h-px w-8 bg-bolt" aria-hidden="true" />
                  <span className="text-[9px] font-extrabold uppercase tracking-[.18em] text-bolt">{copy.comingSoon}</span>
                </div>
              </article>

              <article className="product-definition product-definition-os">
                <p className="eyebrow text-bolt">{copy.osAudience}</p>
                <h2 className="mt-4 font-display text-5xl font-semibold uppercase leading-none tracking-[-.04em] md:text-6xl">Allfit OS</h2>
                <p className="mt-5 max-w-md text-sm leading-6 text-white/48">{copy.osDescription}</p>
                <a href="mailto:hello@allfitone.com" className={cn(buttonVariants({ size: "lg" }), "mt-8 h-12 rounded-full bg-bolt px-6 text-[10px] font-extrabold uppercase tracking-[.16em] text-void hover:bg-cyan-light")}>
                  {copy.requestDemo}
                  <ArrowUpRight data-icon="inline-end" />
                </a>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="allfit-space" className="bg-chalk text-void">
        <div className="site-grid py-24 md:py-32 lg:py-40">
          <div className="col-span-12 md:col-span-3">
            <p className="product-section-label text-turquoise-dark">{copy.appSectionLabel}</p>
          </div>
          <div className="col-span-12 mt-8 md:col-span-9 md:mt-0 lg:col-span-8">
            <h2 className="section-title text-void">{copy.appSectionTitle}</h2>
            <p className="mt-8 max-w-2xl text-base leading-7 text-void/62 md:text-lg md:leading-8">{copy.appSectionCopy}</p>
          </div>

          <div className="col-span-12 mt-20 grid border-y border-void/14 md:mt-28 md:grid-cols-3">
            {copy.appPillars.map(([title, description], index) => {
              const Icon = appPillarIcons[index];
              return (
                <article key={title} className="app-pillar border-b border-void/14 py-8 last:border-b-0 md:border-r md:border-b-0 md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                  <Icon className="size-5 text-turquoise-dark" strokeWidth={1.6} aria-hidden="true" />
                  <h3 className="mt-10 font-display text-4xl font-semibold uppercase leading-none tracking-[-.035em]">{title}</h3>
                  <p className="mt-5 max-w-sm text-sm leading-6 text-void/58">{description}</p>
                </article>
              );
            })}
          </div>

          <div className="col-span-12 mt-20 overflow-hidden rounded-2xl bg-void px-6 py-8 text-white md:mt-28 md:px-10 md:py-10">
            <div className="flex flex-col gap-3 border-b border-white/12 pb-7 md:flex-row md:items-end md:justify-between">
              <h3 className="font-display text-3xl font-semibold uppercase tracking-[-.03em] md:text-4xl">{copy.appAreasLabel}</h3>
              <p className="text-[9px] font-extrabold uppercase tracking-[.18em] text-bolt">{copy.appVision}</p>
            </div>
            <div className="grid md:grid-cols-5">
              {copy.appAreas.map(([area, description]) => (
                <div key={area} className="border-b border-white/10 py-6 last:border-b-0 md:border-r md:border-b-0 md:px-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                  <p className="font-display text-2xl font-semibold uppercase text-bolt">{area}</p>
                  <p className="mt-2 text-xs leading-5 text-white/42">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="allfit-os" className="relative overflow-hidden bg-panel text-white">
        <div className="os-section-mark" aria-hidden="true">OS</div>
        <div className="site-grid relative z-10 py-24 md:py-32 lg:py-40">
          <div className="col-span-12 md:col-span-3">
            <p className="product-section-label text-bolt">{copy.osSectionLabel}</p>
          </div>
          <div className="col-span-12 mt-8 md:col-span-9 md:mt-0 lg:col-span-8">
            <h2 className="section-title">{copy.osSectionTitle}</h2>
            <p className="mt-8 max-w-2xl text-base leading-7 text-white/58 md:text-lg md:leading-8">{copy.osSectionCopy}</p>
            <a href="mailto:hello@allfitone.com" className={cn(buttonVariants({ size: "lg" }), "mt-9 h-12 rounded-full bg-bolt px-6 text-[10px] font-extrabold uppercase tracking-[.16em] text-void hover:bg-cyan-light")}>
              {copy.requestDemo}
              <ArrowUpRight data-icon="inline-end" />
            </a>
          </div>

          <div className="col-span-12 mt-20 md:mt-28">
            <p className="mb-6 text-[9px] font-extrabold uppercase tracking-[.18em] text-white/34">{copy.osModulesLabel}</p>
            <div className="border-t border-white/14">
              {copy.osModules.map(([module, description], index) => {
                const Icon = osModuleIcons[index];
                return (
                  <article key={module} className="os-module-row grid grid-cols-[2rem_1fr] items-start gap-4 border-b border-white/14 py-6 md:grid-cols-[3rem_minmax(12rem,.75fr)_1fr] md:items-center md:gap-7">
                    <Icon className="mt-1 size-5 text-bolt md:mt-0" strokeWidth={1.5} aria-hidden="true" />
                    <h3 className="font-display text-3xl font-semibold uppercase leading-none tracking-[-.03em] md:text-4xl">{module}</h3>
                    <p className="col-start-2 text-sm leading-6 text-white/42 md:col-start-3">{description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="ecosystem" className="bg-bolt text-void">
        <div className="site-grid py-24 md:py-32">
          <div className="col-span-12 md:col-span-4">
            <p className="product-section-label text-turquoise-dark">{copy.ecosystemLabel}</p>
          </div>
          <div className="col-span-12 mt-8 md:col-span-8 md:mt-0 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(17rem,.85fr)] lg:items-end lg:gap-12">
            <h2 className="section-title text-void">{copy.ecosystemTitle}</h2>
            <p className="mt-8 max-w-2xl text-base leading-7 text-void/62 md:text-lg md:leading-8 lg:mt-0">{copy.ecosystemCopy}</p>
          </div>

          <div className="ecosystem-bridge col-span-12 mt-16 md:mt-20">
            {copy.ecosystemRows.map(([person, organization]) => (
              <div key={person} className="ecosystem-bridge-row">
                <p className="ecosystem-bridge-person">{person}</p>
                <span className="ecosystem-bridge-node" aria-hidden="true">
                  <ArrowUpRight className="size-4" />
                </span>
                <p className="ecosystem-bridge-organization">{organization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="footer" className="bg-void px-5 pb-7 pt-10 text-white md:px-8 md:pt-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-center justify-between gap-6 md:items-end">
            <div className="flex items-center">
              <LogoMark className="h-9 w-10" />
              <span className="sr-only">Allfit One</span>
            </div>
            <nav className="flex w-fit items-center gap-0 text-white/45" aria-label={language === "es" ? "Redes sociales de Allfit One" : "Allfit One social media"}>
              <a href="https://www.instagram.com/allfit.one/" target="_blank" rel="noopener noreferrer" className="flex size-11 items-center justify-center transition-colors hover:text-bolt focus-visible:text-bolt focus-visible:outline-none" aria-label={language === "es" ? "Allfit One en Instagram" : "Allfit One on Instagram"}>
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.4" cy="6.6" r=".8" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="https://www.tiktok.com/@allfit.one" target="_blank" rel="noopener noreferrer" className="flex size-11 items-center justify-center transition-colors hover:text-bolt focus-visible:text-bolt focus-visible:outline-none" aria-label={language === "es" ? "Allfit One en TikTok" : "Allfit One on TikTok"}>
                <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14.4 2.5h2.8a4.8 4.8 0 0 0 4.3 4.3v2.8a7.5 7.5 0 0 1-4.3-1.4v7.1a6.2 6.2 0 1 1-5.4-6.1v2.9a3.4 3.4 0 1 0 2.6 3.2V2.5Z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/allfit-one/" target="_blank" rel="noopener noreferrer" className="flex size-11 items-center justify-center transition-colors hover:text-bolt focus-visible:text-bolt focus-visible:outline-none" aria-label={language === "es" ? "Allfit One en LinkedIn" : "Allfit One on LinkedIn"}>
                <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.7 8.3H3.4V21h3.3V8.3ZM5.05 3A2.05 2.05 0 1 0 5 7.1 2.05 2.05 0 0 0 5.05 3ZM21 13.72c0-3.83-2.04-5.61-4.77-5.61a4.12 4.12 0 0 0-3.75 2.06V8.3H9.15V21h3.33v-6.29c0-1.66.31-3.27 2.37-3.27 2.03 0 2.06 1.9 2.06 3.38V21H21v-7.28Z" />
                </svg>
              </a>
            </nav>
          </div>
          <Image
            src="/brand/reusable/wordmark/allfit-one-wordmark-on-dark.svg"
            alt=""
            width={4047}
            height={756}
            className="mx-auto mt-20 h-auto w-full max-w-[1160px]"
            aria-hidden="true"
          />
          <Separator className="mt-10 bg-white/10" />
          <div className="mt-5 grid gap-4 text-[8px] font-bold uppercase tracking-[.16em] text-white/25 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <span>© 2026 Allfit One</span>
            <p className="flex min-h-11 items-center text-[10px] font-medium uppercase tracking-[.12em] text-white/40">All the fitness in one place.</p>
            <span className="sm:justify-self-end">{copy.built}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
