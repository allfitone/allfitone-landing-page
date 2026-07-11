"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Dumbbell,
  MoveUpRight,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogoMark } from "@/components/logo-mark";

type Language = "es" | "en";

const icons = [Users, CalendarDays, Dumbbell, Activity];

const content = {
  es: {
    nav: ["Allfit OS", "Ecosistema", "Próximamente"], access: "Solicitar acceso", accessShort: "Acceso",
    hero: "Creamos el lugar donde personas, entrenamiento y progreso se conectan. El primer paso es", discover: "Descubrir Allfit OS", ecosystem: "Ver el ecosistema",
    adherence: "Adherencia", weeklyLoad: "Carga semanal", thisWeek: "+12.4% esta semana", sessionsToday: "Sesiones hoy", inProgress: "6 en curso", athleteAlt: "Atleta entrenando con intensidad",
    product: "Producto 01 / Allfit OS", operation: "Tu operación.", athleteMode: "En modo atleta.", osIntro: "Allfit OS organiza el trabajo diario sin alejarte de lo importante: las personas y su entrenamiento.", knowIt: "Quiero conocerlo",
    menu: ["Resumen", "Personas", "Programación", "Ejercicios", "Reportes"], date: "Martes, 11 de julio", greeting: "Buenos días, Daniel.", location: "Sede principal",
    stats: ["Atletas activos", "Sesiones hoy", "Adherencia", "Alertas"], weeklyActivity: "Actividad semanal", lastDays: "Últimos 7 días", nextSession: "Siguiente sesión", athletes: "12 atletas · 18:30",
    together: "Todo trabaja junto", lessFriction: "Menos fricción.", moreMovement: "Más movimiento.", madeFor: "Hecho para",
    capabilities: [["Personas", "Perfiles, membresías y evolución en un mismo lugar."], ["Programación", "Sesiones, bloques y calendarios que sí se entienden."], ["Entrenamiento", "Prescribe, registra y ajusta cada estímulo."], ["Progreso", "Decisiones claras con el contexto completo del atleta."]],
    audiences: ["Gimnasios", "Centros deportivos", "Entrenadores"], next: "Lo siguiente / AllfitOne App", hybridTitle: "El atleta híbrido tendrá su lugar.", hybridCopy: "Entrena fuerza. Corre lejos. Compite contra tus límites. Estamos construyendo una experiencia para atletas que no caben en una sola disciplina.",
    phoneToday: "Hoy / Motor híbrido", phoneTitle: "Construye al", phoneTitleAccent: "atleta completo.", todaySession: "Sesión de hoy", runningLoad: "Carga de carrera", strength: "Fuerza",
    early: "Acceso anticipado", prepare: "Prepárate para", operate: "operar mejor.", contactCopy: "Conoce Allfit OS y cuéntanos cómo entrenas, programas y gestionas hoy.", built: "Creado para el movimiento",
  },
  en: {
    nav: ["Allfit OS", "Ecosystem", "Coming soon"], access: "Request access", accessShort: "Access",
    hero: "We are building the place where people, training and progress connect. The first step is", discover: "Discover Allfit OS", ecosystem: "Explore the ecosystem",
    adherence: "Adherence", weeklyLoad: "Weekly load", thisWeek: "+12.4% this week", sessionsToday: "Sessions today", inProgress: "6 in progress", athleteAlt: "Athlete training with intensity",
    product: "Product 01 / Allfit OS", operation: "Your operation.", athleteMode: "In athlete mode.", osIntro: "Allfit OS organizes daily work without taking you away from what matters: people and their training.", knowIt: "Explore the product",
    menu: ["Overview", "People", "Programming", "Exercises", "Reports"], date: "Tuesday, July 11", greeting: "Good morning, Daniel.", location: "Main location",
    stats: ["Active athletes", "Sessions today", "Adherence", "Alerts"], weeklyActivity: "Weekly activity", lastDays: "Last 7 days", nextSession: "Next session", athletes: "12 athletes · 18:30",
    together: "Everything works together", lessFriction: "Less friction.", moreMovement: "More movement.", madeFor: "Built for",
    capabilities: [["People", "Profiles, memberships and progress in one place."], ["Programming", "Sessions, blocks and calendars that make sense."], ["Training", "Prescribe, record and adjust every stimulus."], ["Progress", "Clear decisions with the athlete's full context."]],
    audiences: ["Gyms", "Sports centers", "Coaches"], next: "Up next / AllfitOne App", hybridTitle: "Hybrid athletes will have their place.", hybridCopy: "Build strength. Run far. Compete against your limits. We are creating an experience for athletes who do not fit into a single discipline.",
    phoneToday: "Today / Hybrid engine", phoneTitle: "Build the", phoneTitleAccent: "complete athlete.", todaySession: "Today's session", runningLoad: "Running load", strength: "Strength",
    early: "Early access", prepare: "Get ready to", operate: "operate better.", contactCopy: "Discover Allfit OS and tell us how you train, program and manage today.", built: "Built for movement",
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
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

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("allfitone-language", nextLanguage);
  }

  return (
    <main className="bg-void text-white">
      <section id="home" className="hero relative min-h-screen overflow-hidden">
        <nav className="site-grid relative z-30 items-center py-6" aria-label={language === "es" ? "Navegación principal" : "Main navigation"}>
          <a href="#home" className="brand col-span-5 md:col-span-3" aria-label={language === "es" ? "AllfitOne, inicio" : "AllfitOne, home"}>
            <LogoMark />
            <span>ALLFIT<span className="brand-one">ONE</span></span>
          </a>
          <div className="col-span-6 hidden justify-center gap-9 text-[10px] font-bold uppercase tracking-[0.18em] text-white/48 md:flex">
            <a href="#os" className="nav-link">{t.nav[0]}</a>
            <a href="#ecosystem" className="nav-link">{t.nav[1]}</a>
            <a href="#upcoming" className="nav-link">{t.nav[2]}</a>
          </div>
          <div className="col-span-7 ml-auto flex items-center gap-4 md:col-span-3">
            <div className="flex rounded-full border border-white/15 p-0.5 text-[8px] font-extrabold" aria-label={language === "es" ? "Seleccionar idioma" : "Select language"}>
              {(["es", "en"] as const).map((item) => <button key={item} type="button" onClick={() => changeLanguage(item)} className={language === item ? "rounded-full bg-bolt px-2 py-1 text-void" : "rounded-full px-2 py-1 text-white/45 transition-colors hover:text-white"} aria-pressed={language === item}>{item.toUpperCase()}</button>)}
            </div>
            <a href="#contact" className="ml-auto flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white">
              <span className="md:hidden">{t.accessShort}</span><span className="hidden md:inline">{t.access}</span> <ArrowUpRight className="size-4 text-bolt" aria-hidden="true" />
            </a>
          </div>
        </nav>

        <div className="site-grid relative z-20 min-h-[calc(100vh-80px)] items-center pb-10 pt-12 md:pb-16 md:pt-8">
          <div className="col-span-12 md:col-span-7">
            <h1 className="hero-title">
              All the fitness
              <span className="block text-bolt">in one place.</span>
            </h1>
            <p className="mt-7 max-w-lg text-sm leading-6 text-white/58 md:text-base md:leading-7">
              {t.hero} <strong className="font-semibold text-white">Allfit OS</strong>.
            </p>
            <div className="mt-9 flex flex-col items-start gap-3 min-[440px]:flex-row min-[440px]:items-center md:flex-wrap md:gap-4">
              <Button nativeButton={false} render={<a href="#os" />} size="lg" className="h-13 rounded-full bg-bolt px-6 text-[10px] font-extrabold uppercase tracking-[0.16em] text-void hover:bg-bolt/85">
                {t.discover} <ArrowDown data-icon="inline-end" />
              </Button>
              <a href="#ecosystem" className="flex items-center gap-2 px-3 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-white">
                {t.ecosystem} <ArrowRight className="size-4" />
              </a>
            </div>
          </div>

          <div className="relative col-span-12 mt-12 min-h-[420px] md:col-span-5 md:mt-0 md:min-h-[680px]">
            <div className="athlete-orbit absolute left-[56%] top-1/2 size-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full md:size-[600px]" />
            <div className="absolute -bottom-6 -left-[10%] -right-[4%] top-0 md:-bottom-16 md:-left-[16%]">
              <Image
                src="/images/allfitone-hero-v0.png"
                alt={t.athleteAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={100}
                className="hero-athlete object-contain object-right-bottom"
              />
            </div>
            <div className="absolute left-0 top-[8%] z-10 flex origin-top-left scale-[.78] flex-col gap-3 min-[440px]:scale-90 md:top-[10%] md:scale-100 md:gap-4">
              <div className="metric-card w-44 md:w-48">
                <div className="flex items-center justify-between"><span className="metric-label">{t.adherence}</span><Activity className="size-4 text-bolt" /></div>
                <strong className="metric-number">87%</strong>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[87%] rounded-full bg-bolt" /></div>
              </div>
              <div className="metric-card w-44 md:w-48">
                <span className="metric-label">{t.weeklyLoad}</span>
                <strong className="metric-number">4,820</strong>
                <span className="mt-1 block text-[9px] font-bold text-bolt">{t.thisWeek}</span>
                <div className="mt-4 flex h-9 items-end gap-1" aria-hidden="true">
                  {[38, 58, 48, 78, 64, 92, 72].map((height, i) => <span key={i} className="flex-1 rounded-sm bg-bolt/70" style={{ height: `${height}%` }} />)}
                </div>
              </div>
              <div className="metric-card w-44 md:w-48">
                <div className="flex items-center justify-between"><span className="metric-label">{t.sessionsToday}</span><CalendarDays className="size-4 text-bolt" /></div>
                <div className="flex items-end justify-between">
                  <strong className="metric-number">32</strong>
                  <span className="mb-1 text-[8px] font-bold uppercase tracking-[.12em] text-bolt">{t.inProgress}</span>
                </div>
                <div className="mt-3 grid grid-cols-8 gap-1" aria-hidden="true">
                  {[1, 1, 1, 1, 1, 1, 0, 0].map((active, i) => <span key={i} className={active ? "h-1 rounded-full bg-bolt" : "h-1 rounded-full bg-white/10"} />)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-gradient-to-r from-transparent via-bolt/60 to-transparent" />
      </section>

      <section id="os" className="relative overflow-hidden bg-chalk py-24 text-void md:py-36">
        <div className="site-grid items-end">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-void/45">{t.product}</p>
          </div>
          <div className="col-span-12 mt-6 md:col-span-9 md:mt-0">
            <h2 className="section-title max-w-5xl">{t.operation}<br /><span className="text-outline">{t.athleteMode}</span></h2>
          </div>
        </div>

        <div className="site-grid mt-14 items-start md:mt-20">
          <div className="col-span-12 md:col-span-3">
            <p className="max-w-xs text-sm leading-6 text-void/55">{t.osIntro}</p>
            <a href="#contact" className="mt-7 inline-flex items-center gap-2 border-b border-void pb-1 text-[10px] font-extrabold uppercase tracking-[0.16em]">{t.knowIt} <MoveUpRight className="size-4" /></a>
          </div>
          <div className="col-span-12 mt-12 md:col-span-9 md:mt-0">
            <div className="os-window overflow-hidden rounded-[22px] border border-void/10 bg-void p-3 shadow-[0_30px_80px_rgba(7,9,8,.22)] md:p-4">
              <div className="flex items-center justify-between px-2 pb-3 text-white/40">
                <div className="flex gap-1.5"><span className="size-2 rounded-full bg-white/20" /><span className="size-2 rounded-full bg-white/20" /><span className="size-2 rounded-full bg-bolt" /></div>
                <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Allfit OS / Performance view</span>
              </div>
              <div className="grid min-h-[520px] grid-cols-12 overflow-hidden rounded-[14px] bg-[#06101d] text-white">
                <aside className="col-span-2 hidden border-r border-white/8 p-4 md:block">
                  <div className="brand text-xs"><LogoMark className="small" /><span>OS</span></div>
                  <div className="mt-10 flex flex-col gap-2 text-[9px] font-semibold text-white/35">
                    {t.menu.map((item, index) => <span key={item} className={index === 0 ? 'rounded-md bg-bolt px-3 py-2.5 text-void' : 'px-3 py-2.5'}>{item}</span>)}
                  </div>
                </aside>
                <div className="col-span-12 p-4 md:col-span-10 md:p-7">
                  <div className="flex items-start justify-between"><div><p className="text-[9px] uppercase tracking-[0.18em] text-white/35">{t.date}</p><h3 className="mt-1 text-xl font-semibold">{t.greeting}</h3></div><span className="rounded-full bg-white/7 px-3 py-2 text-[9px] text-white/55">{t.location}</span></div>
                  <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {t.stats.map((label, i) => <div key={label} className="rounded-xl border border-white/8 bg-white/[.035] p-4"><p className="text-[8px] uppercase tracking-[.12em] text-white/35">{label}</p><strong className={i === 2 ? 'mt-3 block text-3xl text-bolt' : 'mt-3 block text-3xl'}>{['184','32','87%','06'][i]}</strong></div>)}
                  </div>
                  <div className="mt-3 grid gap-3 lg:grid-cols-[1.35fr_.65fr]">
                    <div className="rounded-xl border border-white/8 bg-white/[.035] p-5">
                      <div className="flex justify-between"><p className="text-xs font-semibold">{t.weeklyActivity}</p><span className="text-[8px] text-white/35">{t.lastDays}</span></div>
                      <div className="relative mt-8 flex h-40 items-end gap-3 border-b border-white/8 px-2">
                        {[42, 65, 54, 82, 71, 94, 76].map((height, i) => <div key={i} className="flex h-full flex-1 items-end"><span className={i === 5 ? 'w-full rounded-t bg-bolt' : 'w-full rounded-t bg-white/12'} style={{height:`${height}%`}} /></div>)}
                      </div>
                      <div className="mt-3 flex justify-around text-[8px] text-white/25"><span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span></div>
                    </div>
                    <div className="rounded-xl bg-bolt p-5 text-void">
                      <p className="text-[9px] font-extrabold uppercase tracking-[.14em]">{t.nextSession}</p>
                      <p className="mt-8 text-2xl font-bold leading-tight">Hybrid<br />Performance</p>
                      <p className="mt-3 text-[9px] font-semibold opacity-60">{t.athletes}</p>
                      <div className="mt-8 flex size-10 items-center justify-center rounded-full bg-void text-bolt"><ArrowUpRight className="size-4" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ecosystem" className="bg-void py-24 md:py-32">
        <div className="site-grid">
          <div className="col-span-12 md:col-span-4"><p className="eyebrow text-white/35">{t.together}</p></div>
          <div className="col-span-12 mt-6 md:col-span-8 md:mt-0"><h2 className="section-title max-w-4xl">{t.lessFriction}<br /><span className="text-bolt">{t.moreMovement}</span></h2></div>
        </div>
        <div className="site-grid mt-16 md:mt-24">
          {t.capabilities.map(([title, copy], index) => {
            const Icon = icons[index];
            return (
            <article key={title} className="capability col-span-12 border-t border-white/12 py-7 md:col-span-3 md:min-h-64 md:border-l md:border-t-0 md:px-6 md:py-0 first:md:border-l-0">
              <div className="flex items-center justify-between"><Icon className="size-5 text-bolt" /><span className="text-[9px] font-bold text-white/25">0{index + 1}</span></div>
              <h3 className="mt-10 font-display text-4xl font-semibold uppercase tracking-[-.03em]">{title}</h3>
              <p className="mt-4 max-w-[240px] text-sm leading-6 text-white/42">{copy}</p>
            </article>
          )})}
        </div>
        <div className="site-grid mt-20">
          <div className="col-span-12 rounded-2xl border border-white/10 bg-panel px-6 py-8 md:px-10">
            <p className="eyebrow text-white/30">{t.madeFor}</p>
            <div className="mt-7 flex flex-col md:flex-row md:items-center md:justify-between">
              {t.audiences.map((audience) => <div key={audience} className="group flex flex-1 items-center justify-between border-t border-white/10 py-5 md:border-l md:border-t-0 md:px-7 first:md:border-l-0"><span className="font-display text-3xl font-semibold uppercase text-white/70 transition-colors group-hover:text-bolt">{audience}</span><ArrowUpRight className="size-4 text-white/25" /></div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="upcoming" className="relative overflow-hidden bg-bolt py-24 text-void md:py-32">
        <div className="absolute -right-28 top-1/2 size-[500px] -translate-y-1/2 rounded-full border-[80px] border-void/7 md:size-[760px]" />
        <div className="site-grid relative z-10 items-center">
          <div className="col-span-12 md:col-span-7">
            <p className="eyebrow text-void/45">{t.next}</p>
            <h2 className="section-title mt-7 max-w-3xl">{t.hybridTitle}</h2>
            <p className="mt-7 max-w-lg text-sm leading-6 text-void/60">{t.hybridCopy}</p>
          </div>
          <div className="col-span-12 mt-12 md:col-span-5 md:mt-0">
            <div className="phone-shell mx-auto w-[270px] rotate-[5deg] rounded-[42px] border-[8px] border-void bg-void p-2 shadow-[0_35px_60px_rgba(7,9,8,.25)]">
              <div className="min-h-[510px] overflow-hidden rounded-[30px] bg-[#071923] p-5 text-white">
                <div className="mx-auto h-4 w-20 rounded-full bg-black" />
                <p className="mt-9 text-[9px] uppercase tracking-[.17em] text-white/35">{t.phoneToday}</p>
                <h3 className="mt-2 font-display text-4xl font-semibold uppercase leading-[.88]">{t.phoneTitle}<br /><span className="text-bolt">{t.phoneTitleAccent}</span></h3>
                <div className="mt-8 rounded-2xl bg-bolt p-4 text-void"><p className="text-[8px] font-bold uppercase tracking-[.14em]">{t.todaySession}</p><p className="mt-5 text-xl font-bold">Engine + Lower</p><div className="mt-5 flex items-center justify-between text-[9px] font-semibold"><span>52 min</span><span className="flex size-8 items-center justify-center rounded-full bg-void text-bolt"><ArrowRight className="size-4" /></span></div></div>
                <div className="mt-3 grid grid-cols-2 gap-3"><div className="rounded-xl bg-white/6 p-4"><p className="text-[8px] text-white/35">{t.runningLoad}</p><strong className="mt-3 block text-2xl">32.4</strong></div><div className="rounded-xl bg-white/6 p-4"><p className="text-[8px] text-white/35">{t.strength}</p><strong className="mt-3 block text-2xl">84%</strong></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-chalk py-24 text-void md:py-32">
        <div className="site-grid items-end">
          <div className="col-span-12 md:col-span-8"><p className="eyebrow text-void/40">{t.early}</p><h2 className="section-title mt-6">{t.prepare}<br />{t.operate}</h2></div>
          <div className="col-span-12 mt-10 md:col-span-4 md:mt-0"><p className="mb-7 text-sm leading-6 text-void/55">{t.contactCopy}</p><Button nativeButton={false} render={<a href="mailto:hello@allfitone.com" />} size="lg" className="h-14 w-full rounded-full bg-void px-6 text-[10px] font-extrabold uppercase tracking-[.16em] text-white hover:bg-void/85">{t.access} <ArrowUpRight data-icon="inline-end" /></Button></div>
        </div>
      </section>

      <footer className="bg-void px-5 pb-7 pt-16 text-white md:px-8 md:pt-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between"><div className="brand text-xl"><LogoMark /><span>ALLFIT<span className="brand-one">ONE</span></span></div><p className="max-w-sm text-sm leading-6 text-white/40">All the Fitness in One place.</p></div>
          <p className="footer-word mt-20 text-center">ALLFITONE</p>
          <Separator className="mt-10 bg-white/10" />
          <div className="mt-5 flex justify-between text-[8px] font-bold uppercase tracking-[.16em] text-white/25"><span>© 2026 AllfitOne</span><span>{t.built}</span></div>
        </div>
      </footer>
    </main>
  );
}
