import Image from "next/image";
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

const capabilities = [
  { icon: Users, title: "Personas", copy: "Perfiles, membresías y evolución en un mismo lugar." },
  { icon: CalendarDays, title: "Programación", copy: "Sesiones, bloques y calendarios que sí se entienden." },
  { icon: Dumbbell, title: "Entrenamiento", copy: "Prescribe, registra y ajusta cada estímulo." },
  { icon: Activity, title: "Progreso", copy: "Decisiones claras con el contexto completo del atleta." },
];

const audiences = ["Gimnasios", "Centros deportivos", "Entrenadores"];

export default function Home() {
  return (
    <main className="bg-void text-white">
      <section id="inicio" className="hero relative min-h-screen overflow-hidden">
        <nav className="site-grid relative z-30 items-center py-6" aria-label="Navegación principal">
          <a href="#inicio" className="brand col-span-5 md:col-span-3" aria-label="AllfitOne, inicio">
            <span className="brand-mark" aria-hidden="true">A</span>
            <span>ALLFITONE</span>
          </a>
          <div className="col-span-6 hidden justify-center gap-9 text-[10px] font-bold uppercase tracking-[0.18em] text-white/48 md:flex">
            <a href="#os" className="nav-link">Allfit OS</a>
            <a href="#ecosistema" className="nav-link">Ecosistema</a>
            <a href="#proximo" className="nav-link">Próximamente</a>
          </div>
          <a href="#contacto" className="col-span-7 ml-auto flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white md:col-span-3">
            <span className="md:hidden">Acceso</span><span className="hidden md:inline">Solicitar acceso</span> <ArrowUpRight className="size-4 text-bolt" aria-hidden="true" />
          </a>
        </nav>

        <div className="site-grid relative z-20 min-h-[calc(100vh-80px)] items-center pb-10 pt-12 md:pb-16 md:pt-8">
          <div className="col-span-12 md:col-span-7">
            <div className="mb-7 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-bolt/40 bg-bolt/5 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-bolt">
                <span className="size-1.5 rounded-full bg-bolt shadow-[0_0_10px_var(--bolt)]" /> Allfit OS · Acceso anticipado
              </span>
            </div>
            <h1 className="hero-title">
              All the fitness
              <span className="block text-bolt">in one place.</span>
            </h1>
            <p className="mt-7 max-w-lg text-sm leading-6 text-white/58 md:text-base md:leading-7">
              Creamos el lugar donde personas, entrenamiento y progreso se conectan. El primer paso es <strong className="font-semibold text-white">Allfit OS</strong>.
            </p>
            <div className="mt-9 flex flex-col items-start gap-3 min-[440px]:flex-row min-[440px]:items-center md:flex-wrap md:gap-4">
              <Button nativeButton={false} render={<a href="#os" />} size="lg" className="h-13 rounded-full bg-bolt px-6 text-[10px] font-extrabold uppercase tracking-[0.16em] text-void hover:bg-bolt/85">
                Descubrir Allfit OS <ArrowDown data-icon="inline-end" />
              </Button>
              <a href="#ecosistema" className="flex items-center gap-2 px-3 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-white">
                Ver el ecosistema <ArrowRight className="size-4" />
              </a>
            </div>
          </div>

          <div className="relative col-span-12 mt-12 min-h-[420px] md:col-span-5 md:mt-0 md:min-h-[680px]">
            <div className="athlete-orbit absolute left-1/2 top-1/2 size-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full md:size-[600px]" />
            <div className="absolute inset-x-[-20%] bottom-0 top-0">
              <Image
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1400&q=90"
                alt="Atleta entrenando con intensidad"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="hero-athlete object-cover object-[58%_28%]"
              />
            </div>
            <div className="metric-card absolute right-0 top-[12%] hidden w-48 md:block">
              <div className="flex items-center justify-between"><span className="metric-label">Adherencia</span><Activity className="size-4 text-bolt" /></div>
              <strong className="metric-number">87%</strong>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[87%] rounded-full bg-bolt" /></div>
            </div>
            <div className="metric-card absolute bottom-[16%] left-0 w-44">
              <span className="metric-label">Carga semanal</span>
              <strong className="metric-number">4,820</strong>
              <span className="mt-1 block text-[9px] font-bold text-bolt">+12.4% esta semana</span>
              <div className="mt-4 flex h-9 items-end gap-1" aria-hidden="true">
                {[38, 58, 48, 78, 64, 92, 72].map((height, i) => <span key={i} className="flex-1 rounded-sm bg-bolt/70" style={{ height: `${height}%` }} />)}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-gradient-to-r from-transparent via-bolt/60 to-transparent" />
      </section>

      <section id="os" className="relative overflow-hidden bg-chalk py-24 text-void md:py-36">
        <div className="site-grid items-end">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-void/45">Producto 01 / Allfit OS</p>
          </div>
          <div className="col-span-12 mt-6 md:col-span-9 md:mt-0">
            <h2 className="section-title max-w-5xl">Tu operación.<br /><span className="text-outline">En modo atleta.</span></h2>
          </div>
        </div>

        <div className="site-grid mt-14 items-start md:mt-20">
          <div className="col-span-12 md:col-span-3">
            <p className="max-w-xs text-sm leading-6 text-void/55">Allfit OS organiza el trabajo diario sin alejarte de lo importante: las personas y su entrenamiento.</p>
            <a href="#contacto" className="mt-7 inline-flex items-center gap-2 border-b border-void pb-1 text-[10px] font-extrabold uppercase tracking-[0.16em]">Quiero conocerlo <MoveUpRight className="size-4" /></a>
          </div>
          <div className="col-span-12 mt-12 md:col-span-9 md:mt-0">
            <div className="os-window overflow-hidden rounded-[22px] border border-void/10 bg-void p-3 shadow-[0_30px_80px_rgba(7,9,8,.22)] md:p-4">
              <div className="flex items-center justify-between px-2 pb-3 text-white/40">
                <div className="flex gap-1.5"><span className="size-2 rounded-full bg-white/20" /><span className="size-2 rounded-full bg-white/20" /><span className="size-2 rounded-full bg-bolt" /></div>
                <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Allfit OS / Performance view</span>
              </div>
              <div className="grid min-h-[520px] grid-cols-12 overflow-hidden rounded-[14px] bg-[#0d100e] text-white">
                <aside className="col-span-2 hidden border-r border-white/8 p-4 md:block">
                  <div className="brand text-xs"><span className="brand-mark small">A</span><span>OS</span></div>
                  <div className="mt-10 flex flex-col gap-2 text-[9px] font-semibold text-white/35">
                    {['Resumen', 'Personas', 'Programación', 'Ejercicios', 'Reportes'].map((item, index) => <span key={item} className={index === 0 ? 'rounded-md bg-bolt px-3 py-2.5 text-void' : 'px-3 py-2.5'}>{item}</span>)}
                  </div>
                </aside>
                <div className="col-span-12 p-4 md:col-span-10 md:p-7">
                  <div className="flex items-start justify-between"><div><p className="text-[9px] uppercase tracking-[0.18em] text-white/35">Martes, 11 de julio</p><h3 className="mt-1 text-xl font-semibold">Buenos días, Daniel.</h3></div><span className="rounded-full bg-white/7 px-3 py-2 text-[9px] text-white/55">Sede Principal</span></div>
                  <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {[['Atletas activos','184'],['Sesiones hoy','32'],['Adherencia','87%'],['Alertas','06']].map(([label,value], i) => <div key={label} className="rounded-xl border border-white/8 bg-white/[.035] p-4"><p className="text-[8px] uppercase tracking-[.12em] text-white/35">{label}</p><strong className={i === 2 ? 'mt-3 block text-3xl text-bolt' : 'mt-3 block text-3xl'}>{value}</strong></div>)}
                  </div>
                  <div className="mt-3 grid gap-3 lg:grid-cols-[1.35fr_.65fr]">
                    <div className="rounded-xl border border-white/8 bg-white/[.035] p-5">
                      <div className="flex justify-between"><p className="text-xs font-semibold">Actividad semanal</p><span className="text-[8px] text-white/35">Últimos 7 días</span></div>
                      <div className="relative mt-8 flex h-40 items-end gap-3 border-b border-white/8 px-2">
                        {[42, 65, 54, 82, 71, 94, 76].map((height, i) => <div key={i} className="flex h-full flex-1 items-end"><span className={i === 5 ? 'w-full rounded-t bg-bolt' : 'w-full rounded-t bg-white/12'} style={{height:`${height}%`}} /></div>)}
                      </div>
                      <div className="mt-3 flex justify-around text-[8px] text-white/25"><span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span></div>
                    </div>
                    <div className="rounded-xl bg-bolt p-5 text-void">
                      <p className="text-[9px] font-extrabold uppercase tracking-[.14em]">Siguiente sesión</p>
                      <p className="mt-8 text-2xl font-bold leading-tight">Hybrid<br />Performance</p>
                      <p className="mt-3 text-[9px] font-semibold opacity-60">12 atletas · 18:30</p>
                      <div className="mt-8 flex size-10 items-center justify-center rounded-full bg-void text-bolt"><ArrowUpRight className="size-4" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ecosistema" className="bg-void py-24 md:py-32">
        <div className="site-grid">
          <div className="col-span-12 md:col-span-4"><p className="eyebrow text-white/35">Todo trabaja junto</p></div>
          <div className="col-span-12 mt-6 md:col-span-8 md:mt-0"><h2 className="section-title max-w-4xl">Menos fricción.<br /><span className="text-bolt">Más movimiento.</span></h2></div>
        </div>
        <div className="site-grid mt-16 md:mt-24">
          {capabilities.map(({ icon: Icon, title, copy }, index) => (
            <article key={title} className="capability col-span-12 border-t border-white/12 py-7 md:col-span-3 md:min-h-64 md:border-l md:border-t-0 md:px-6 md:py-0 first:md:border-l-0">
              <div className="flex items-center justify-between"><Icon className="size-5 text-bolt" /><span className="text-[9px] font-bold text-white/25">0{index + 1}</span></div>
              <h3 className="mt-10 font-display text-4xl font-semibold uppercase tracking-[-.03em]">{title}</h3>
              <p className="mt-4 max-w-[240px] text-sm leading-6 text-white/42">{copy}</p>
            </article>
          ))}
        </div>
        <div className="site-grid mt-20">
          <div className="col-span-12 rounded-2xl border border-white/10 bg-panel px-6 py-8 md:px-10">
            <p className="eyebrow text-white/30">Hecho para</p>
            <div className="mt-7 flex flex-col md:flex-row md:items-center md:justify-between">
              {audiences.map((audience) => <div key={audience} className="group flex flex-1 items-center justify-between border-t border-white/10 py-5 md:border-l md:border-t-0 md:px-7 first:md:border-l-0"><span className="font-display text-3xl font-semibold uppercase text-white/70 transition-colors group-hover:text-bolt">{audience}</span><ArrowUpRight className="size-4 text-white/25" /></div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="proximo" className="relative overflow-hidden bg-bolt py-24 text-void md:py-32">
        <div className="absolute -right-28 top-1/2 size-[500px] -translate-y-1/2 rounded-full border-[80px] border-void/7 md:size-[760px]" />
        <div className="site-grid relative z-10 items-center">
          <div className="col-span-12 md:col-span-7">
            <p className="eyebrow text-void/45">Lo siguiente / AllfitOne App</p>
            <h2 className="section-title mt-7 max-w-3xl">El atleta híbrido tendrá su lugar.</h2>
            <p className="mt-7 max-w-lg text-sm leading-6 text-void/60">Entrena fuerza. Corre lejos. Compite contra tus límites. Estamos construyendo una experiencia para atletas que no caben en una sola disciplina.</p>
          </div>
          <div className="col-span-12 mt-12 md:col-span-5 md:mt-0">
            <div className="phone-shell mx-auto w-[270px] rotate-[5deg] rounded-[42px] border-[8px] border-void bg-void p-2 shadow-[0_35px_60px_rgba(7,9,8,.25)]">
              <div className="min-h-[510px] overflow-hidden rounded-[30px] bg-[#121612] p-5 text-white">
                <div className="mx-auto h-4 w-20 rounded-full bg-black" />
                <p className="mt-9 text-[9px] uppercase tracking-[.17em] text-white/35">Today / Hybrid engine</p>
                <h3 className="mt-2 font-display text-4xl font-semibold uppercase leading-[.88]">Build the<br /><span className="text-bolt">complete athlete.</span></h3>
                <div className="mt-8 rounded-2xl bg-bolt p-4 text-void"><p className="text-[8px] font-bold uppercase tracking-[.14em]">Today&apos;s session</p><p className="mt-5 text-xl font-bold">Engine + Lower</p><div className="mt-5 flex items-center justify-between text-[9px] font-semibold"><span>52 min</span><span className="flex size-8 items-center justify-center rounded-full bg-void text-bolt"><ArrowRight className="size-4" /></span></div></div>
                <div className="mt-3 grid grid-cols-2 gap-3"><div className="rounded-xl bg-white/6 p-4"><p className="text-[8px] text-white/35">Running load</p><strong className="mt-3 block text-2xl">32.4</strong></div><div className="rounded-xl bg-white/6 p-4"><p className="text-[8px] text-white/35">Strength</p><strong className="mt-3 block text-2xl">84%</strong></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="bg-chalk py-24 text-void md:py-32">
        <div className="site-grid items-end">
          <div className="col-span-12 md:col-span-8"><p className="eyebrow text-void/40">Acceso anticipado</p><h2 className="section-title mt-6">Prepárate para<br />operar mejor.</h2></div>
          <div className="col-span-12 mt-10 md:col-span-4 md:mt-0"><p className="mb-7 text-sm leading-6 text-void/55">Conoce Allfit OS y cuéntanos cómo entrenas, programas y gestionas hoy.</p><Button nativeButton={false} render={<a href="mailto:hello@allfitone.com" />} size="lg" className="h-14 w-full rounded-full bg-void px-6 text-[10px] font-extrabold uppercase tracking-[.16em] text-white hover:bg-void/85">Solicitar acceso <ArrowUpRight data-icon="inline-end" /></Button></div>
        </div>
      </section>

      <footer className="bg-void px-5 pb-7 pt-16 text-white md:px-8 md:pt-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between"><div className="brand text-xl"><span className="brand-mark">A</span><span>ALLFITONE</span></div><p className="max-w-sm text-sm leading-6 text-white/40">All the Fitness in One place.</p></div>
          <p className="footer-word mt-20 text-center">ALLFITONE</p>
          <Separator className="mt-10 bg-white/10" />
          <div className="mt-5 flex justify-between text-[8px] font-bold uppercase tracking-[.16em] text-white/25"><span>© 2026 AllfitOne</span><span>Built for movement</span></div>
        </div>
      </footer>
    </main>
  );
}
