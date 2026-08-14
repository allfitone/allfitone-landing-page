import { ProductWordmark } from "@allfitone/react/brand";
import { PulseMark } from "@allfitone/react/components/pulse-mark";
import { TickRing } from "@allfitone/react/components/tick-ring";
import { FoundationIcon, type IconName } from "@allfitone/react/icons";
import { cn } from "@allfitone/react/lib/utils";

import type { LocalizedContent } from "@/lib/content";

const dashboardIcons = ["overview", "people", "training", "operation", "business"] as const satisfies readonly IconName[];

export function PhoneMockup({ copy }: { copy: LocalizedContent }) {
  return (
    <div className="phone-shell product-phone" aria-hidden="true">
      <div className="phone-screen">
        <div className="phone-island" aria-hidden="true" />

        <div className="mt-7 flex items-end justify-between">
          <div>
            <p className="mock-eyebrow text-white/45">{copy.phoneGreeting}</p>
            <p className="mt-1 font-display text-[2.5rem] font-semibold uppercase leading-none">{copy.phoneToday}</p>
          </div>
          <TickRing aria-label={copy.phoneAdherence} value={87} size={38} className="text-bolt" />
        </div>

        <div className="mt-6 border-y border-white/12 py-4">
          <div className="flex items-center justify-between gap-4">
            <p className="mock-eyebrow text-bolt">{copy.phoneRecovery}</p>
            <PulseMark width={26} className="text-bolt" />
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-bolt p-5 text-void">
          <div className="flex items-center justify-between gap-3">
            <p className="mock-label">{copy.phoneSession}</p>
            <FoundationIcon name="training" size="sm" decorative />
          </div>
          <p className="mt-3 mock-body text-void/70">{copy.phoneLocation}</p>
          <div className="mt-7 flex items-center justify-between border-t border-void/20 pt-4">
            <span className="mock-label flex items-center gap-1.5">
              <FoundationIcon name="time" size="xs" decorative />
              {copy.phoneDuration}
            </span>
            <FoundationIcon name="forward" size="sm" decorative />
          </div>
        </div>

        <div className="mock-action">
          {copy.phoneStart}
          <FoundationIcon name="forward" size="xs" className="text-bolt" decorative />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/12">
          <div className="bg-panel p-4">
            <p className="mock-eyebrow text-white/45">{copy.phoneWeek}</p>
            <strong className="mt-2 block font-display text-xl leading-none">4 / 5</strong>
          </div>
          <div className="bg-panel p-4">
            <p className="mock-eyebrow text-white/45">{copy.phoneAdherence}</p>
            <strong className="mt-2 block font-display text-xl leading-none text-bolt">87%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StudioDashboardMockup({ copy }: { copy: LocalizedContent }) {
  return (
    <div className="studio-shell" aria-hidden="true">
      <div className="studio-topbar">
        <ProductWordmark product="studio" surface="dark" className="h-3.5 w-auto" />
        <div className="flex items-center gap-2.5">
          <span className="mock-eyebrow hidden text-white/40 sm:block">Allfit Performance</span>
          <span className="flex size-7 items-center justify-center rounded-full bg-bolt font-display text-xs font-bold text-void">AP</span>
        </div>
      </div>

      <div className="studio-workspace">
        <aside className="studio-sidebar">
          {copy.dashboardNavigation.map((item, index) => (
            <div key={item} className={cn("studio-nav-item", index === 0 && "studio-nav-item-active")}>
              <FoundationIcon name={dashboardIcons[index]} size="xs" decorative />
              <span>{item}</span>
            </div>
          ))}
        </aside>

        <div className="studio-main">
          <header className="flex items-end justify-between gap-4">
            <div>
              <p className="mock-eyebrow text-bolt">Allfit Studio</p>
              <p className="mt-1 font-display text-2xl font-semibold uppercase leading-none sm:text-3xl">{copy.dashboardOverview}</p>
              <p className="mock-body mt-2 hidden text-white/45 sm:block">{copy.dashboardGreeting}</p>
            </div>
            <span className="mock-eyebrow hidden items-center gap-1.5 text-white/40 md:flex">
              <FoundationIcon name="calendar" size="xs" decorative />
              {copy.phaseLabel}
            </span>
          </header>

          <div className="studio-stat-grid">
            {[
              [copy.dashboardActivePeople, "128"],
              [copy.dashboardSessions, "24"],
              [copy.dashboardAdherence, "87%"],
            ].map(([label, value]) => (
              <article key={label} className="studio-stat">
                <p className="mock-eyebrow text-white/40">{label}</p>
                <strong className="mt-3 block font-display text-2xl font-semibold leading-none sm:text-3xl">{value}</strong>
              </article>
            ))}
          </div>

          <div className="studio-content-grid">
            <section className="studio-panel">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <p className="mock-label text-white/70">{copy.dashboardAgenda}</p>
                <span className="mock-eyebrow text-bolt">{copy.dashboardViewAll}</span>
              </div>
              <div className="flex flex-col">
                {copy.dashboardSchedule.map(([time, session, detail]) => (
                  <div key={`${time}-${session}`} className="grid grid-cols-[42px_1fr_auto] items-center gap-2 border-b border-white/8 py-3 last:border-b-0">
                    <span className="mock-mono text-bolt">{time}</span>
                    <strong className="mock-body truncate font-semibold text-white/80">{session}</strong>
                    <span className="mock-body hidden text-white/40 sm:block">{detail}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="studio-panel studio-activity-panel">
              <p className="mock-label border-b border-white/10 pb-3 text-white/70">{copy.dashboardActivity}</p>
              <div className="flex flex-col">
                {copy.dashboardUpdates.map(([update, time]) => (
                  <div key={update} className="flex gap-2.5 border-b border-white/8 py-3 last:border-b-0">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-bolt" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="mock-body text-white/70">{update}</p>
                      <p className="mock-eyebrow mt-1 text-white/35">{time}</p>
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
