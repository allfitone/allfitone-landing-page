import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, X } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";

const colors = [
  { name: "Black Blue", hex: "#030713", className: "bg-void text-white" },
  { name: "Primary Cyan", hex: "#55EFFB", className: "bg-bolt text-void" },
  { name: "Light Cyan", hex: "#68EEF4", className: "bg-cyan-light text-void" },
  { name: "Mid Turquoise", hex: "#60D1D6", className: "bg-turquoise text-void" },
  { name: "Dark Turquoise", hex: "#348E94", className: "bg-turquoise-dark text-white" },
];

function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`brand ${dark ? "text-void" : "text-white"}`}>
      <LogoMark />
      <span>ALLFIT<span className="brand-one">ONE</span></span>
    </div>
  );
}

export default function BrandLab() {
  return (
    <main className="min-h-screen bg-chalk text-void">
      <header className="border-b border-void/10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 md:px-8">
          <Link href="/" className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-void/55 transition-colors hover:text-void">
            <ArrowLeft className="size-4" /> Back to site
          </Link>
          <span className="text-[9px] font-extrabold uppercase tracking-[.2em] text-void/35">Internal / Brand lab v0.1</span>
        </div>
      </header>

      <section className="border-b border-void/10 py-20 md:py-28">
        <div className="site-grid items-end">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow text-void/40">AllfitOne identity system</p>
            <p className="mt-6 max-w-sm text-sm leading-6 text-void/55">A working space to test the identity across scales, backgrounds and products before it becomes a final brand system.</p>
          </div>
          <div className="col-span-12 mt-12 md:col-span-8 md:mt-0">
            <h1 className="section-title">One system.<br /><span className="text-bolt">Every athlete.</span></h1>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="site-grid">
          <div className="col-span-12 md:col-span-3"><p className="eyebrow text-void/40">01 / Primary signature</p></div>
          <div className="col-span-12 mt-8 grid gap-4 md:col-span-9 md:mt-0 md:grid-cols-2">
            <article className="flex min-h-72 items-center justify-center rounded-2xl bg-void p-8"><div className="brand brand-showcase text-white"><LogoMark className="display" /><span>ALLFIT<span className="brand-one">ONE</span></span></div></article>
            <article className="flex min-h-72 items-center justify-center rounded-2xl border border-void/10 bg-white p-8"><div className="brand brand-showcase text-void"><LogoMark className="display" /><span>ALLFIT<span className="brand-one">ONE</span></span></div></article>
            <div className="rounded-2xl border border-void/10 bg-white p-6">
              <p className="eyebrow text-void/35">Rationale</p>
              <h2 className="mt-5 font-display text-4xl font-semibold uppercase leading-none">Forward by design.</h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-void/55">The numeral uses one continuous silhouette with an extended arrow crown. Its slanted stem mirrors the container, creating upward movement without internal cuts or decorative lines.</p>
            </div>
            <div className="grid grid-cols-3 gap-3 rounded-2xl bg-panel p-6 text-white">
              <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-white/8"><LogoMark className="display" /><span className="eyebrow text-white/30">Hero</span></div>
              <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-white/8"><LogoMark /><span className="eyebrow text-white/30">Nav</span></div>
              <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-white/8"><LogoMark className="small" /><span className="eyebrow text-white/30">UI</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-void py-20 text-white md:py-28">
        <div className="site-grid">
          <div className="col-span-12 md:col-span-3"><p className="eyebrow text-white/35">02 / Product architecture</p></div>
          <div className="col-span-12 mt-8 md:col-span-9 md:mt-0">
            <div className="grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-2">
              <div className="flex min-h-64 flex-col justify-between bg-panel p-8">
                <p className="eyebrow text-white/30">Master brand</p>
                <Wordmark />
              </div>
              <div className="flex min-h-64 flex-col justify-between bg-panel p-8">
                <p className="eyebrow text-white/30">Product signature</p>
                <div className="brand text-4xl"><LogoMark className="display" /><span>OS</span></div>
              </div>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/40">The master brand owns the symbol. Products inherit the “1” and pair it with a direct descriptor, keeping the ecosystem recognizable without creating disconnected logos.</p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="site-grid">
          <div className="col-span-12 md:col-span-3"><p className="eyebrow text-void/40">03 / Color system</p></div>
          <div className="col-span-12 mt-8 md:col-span-9 md:mt-0">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {colors.map((color) => <div key={color.hex} className={`${color.className} flex aspect-[4/5] flex-col justify-between rounded-xl p-5`}><span className="text-[9px] font-extrabold uppercase tracking-[.16em] opacity-55">{color.name}</span><strong className="font-mono text-xs">{color.hex}</strong></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-void/10 bg-white py-20 md:py-28">
        <div className="site-grid">
          <div className="col-span-12 md:col-span-3"><p className="eyebrow text-void/40">04 / Typography</p></div>
          <div className="col-span-12 mt-8 md:col-span-9 md:mt-0">
            <div className="border-b border-void/10 pb-10"><p className="eyebrow text-bolt">Barlow Condensed / Display</p><p className="mt-6 font-display text-[clamp(4rem,10vw,9rem)] font-semibold uppercase leading-[.75] tracking-[-.05em]">Move with intent.</p></div>
            <div className="grid gap-8 pt-10 md:grid-cols-2"><div><p className="eyebrow text-bolt">Manrope / Interface</p><p className="mt-5 text-2xl font-semibold leading-tight">Training is complex.<br />The system should not be.</p></div><p className="max-w-md text-sm leading-7 text-void/55">Manrope carries product language and longer reading. It stays neutral so the condensed display face and the “1” can own the athletic character.</p></div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="site-grid">
          <div className="col-span-12 md:col-span-3"><p className="eyebrow text-void/40">05 / Usage principles</p></div>
          <div className="col-span-12 mt-8 grid gap-4 md:col-span-9 md:mt-0 md:grid-cols-2">
            <article className="rounded-2xl border border-void/10 bg-white p-7"><div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#16784a]"><Check className="size-4" /> Do</div><ul className="mt-8 flex flex-col gap-4 text-sm text-void/60"><li>Keep clear space equal to the width of the symbol.</li><li>Use Performance Blue as the only signature accent.</li><li>Preserve the angle and proportions of the “1.”</li></ul></article>
            <article className="rounded-2xl border border-void/10 bg-white p-7"><div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#b43131]"><X className="size-4" /> Avoid</div><ul className="mt-8 flex flex-col gap-4 text-sm text-void/60"><li>Do not outline, rotate or add effects to the symbol.</li><li>Do not introduce secondary accent colors.</li><li>Do not separate “ONE” from the full wordmark.</li></ul></article>
          </div>
        </div>
      </section>

      <footer className="bg-bolt py-12 text-void">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between md:px-8"><div><p className="eyebrow text-void/45">Living system / Subject to change</p><p className="mt-4 font-display text-5xl font-semibold uppercase">Brand lab v0.1</p></div><Link href="/" className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.16em]">View landing page <ArrowUpRight className="size-4" /></Link></div>
      </footer>
    </main>
  );
}
