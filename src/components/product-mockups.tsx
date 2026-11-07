import { ProductWordmark } from "@allfitone/react/brand";
import { FoundationIcon, type IconName } from "@allfitone/react/icons";
import { cn } from "@allfitone/react/lib/utils";

import type { LocalizedContent } from "@/lib/content";

const dashboardIcons = ["overview", "people", "training", "operation", "business"] as const satisfies readonly IconName[];

/*
 * The two previews tell one moment, so the stage shows the ecosystem instead of two
 * unrelated screens. Mariana trains with Estudio Norte: her phone shows today's 18:00
 * session and that she shares her results with the studio; the studio's panel shows
 * the same 18:00 session in its agenda and the week she shared, four sessions done and
 * today's still pending. Every number on one screen agrees with the other.
 */

export function PhoneMockup({ copy }: { copy: LocalizedContent }) {
  return (
    <div className="phone-shell product-phone" aria-hidden="true">
      <div className="phone-screen">
        <div className="phone-island" aria-hidden="true" />

        <div className="mt-7">
          <p className="mock-eyebrow text-white/56">{copy.phoneGreeting}</p>
          <p className="mt-1 font-display text-[2.5rem] font-semibold uppercase leading-none">{copy.phoneToday}</p>
        </div>

        <div className="mt-6 border-y border-white/12 py-4">
          <p className="mock-eyebrow text-bolt">{copy.phoneRecovery}</p>
        </div>

        <div className="mt-5 rounded-2xl bg-bolt p-5 text-void">
          <div className="flex items-center justify-between gap-3">
            <p className="mock-label">{copy.phoneSession}</p>
            <FoundationIcon name="training" size="sm" decorative />
          </div>
          <p className="mt-3 mock-body text-void/72">{copy.phoneLocation}</p>
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

        <div className="mt-4 overflow-hidden rounded-xl border border-white/12">
          <div className="flex items-baseline justify-between gap-3 px-4 py-3">
            <p className="mock-eyebrow text-white/56">{copy.phoneWeek}</p>
            <strong className="font-display text-xl leading-none">4 / 5</strong>
          </div>
          <p className="mock-body flex items-center gap-1.5 border-t border-white/12 px-4 py-3 text-bolt">
            <FoundationIcon name="permissions" size="xs" decorative />
            {copy.phoneSharedWith} {copy.dashboardOrganization}
          </p>
        </div>
      </div>
    </div>
  );
}

type ExerciseVolume = { sets: number; reps: string; load: number | null };

function exerciseTarget(exercise: ExerciseVolume) {
  return exercise.load === null
    ? `${exercise.sets} × ${exercise.reps}`
    : `${exercise.sets} × ${exercise.reps} · ${exercise.load} kg`;
}

/*
 * The Allfit Space section's phone: the same 18:00 session the hero announces, now under
 * way. Estudio Norte's program sets each exercise and Mariana logs it set by set, so the
 * plan and what she did sit on one screen. The set she is on is the screen's one cyan block.
 */
export function SpaceSessionMockup({ copy }: { copy: LocalizedContent }) {
  const session = copy.spaceSession;
  const current = session.exercises.find((exercise) => exercise.done < exercise.sets) ?? session.exercises[0];
  const setLabel = session.setOf.replace("{set}", String(current.done + 1)).replace("{sets}", String(current.sets));

  return (
    <div className="phone-shell space-phone" aria-hidden="true">
      <div className="phone-screen">
        <div className="phone-island" aria-hidden="true" />

        <div className="mt-6">
          <p className="mock-eyebrow text-bolt">{session.status}</p>
          <p className="mt-2 font-display text-[2rem] font-semibold uppercase leading-none">{copy.phoneSession}</p>
          <p className="mock-body mt-2 text-white/60">{session.plan}</p>
        </div>

        <ol className="space-exercises">
          {session.exercises.map((exercise) => (
            <li
              key={exercise.name}
              className="space-exercise"
              data-state={exercise === current ? "current" : exercise.done === exercise.sets ? "done" : "next"}
            >
              <div className="min-w-0">
                <p className="mock-label">{exercise.name}</p>
                <p className="mock-body mt-1 tabular-nums text-white/56">{exerciseTarget(exercise)}</p>
              </div>
              <span className="space-set-marks">
                {Array.from({ length: exercise.sets }, (_, set) => (
                  <span key={set} className={cn("space-set-mark", set < exercise.done && "space-set-mark-done")} />
                ))}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-4 rounded-2xl bg-bolt p-4 text-void">
          <div className="flex items-baseline justify-between gap-3">
            <p className="mock-label">{current.name}</p>
            <p className="mock-body text-void/72">{setLabel}</p>
          </div>
          <div className="mt-3 flex items-baseline gap-5 tabular-nums">
            <p className="flex items-baseline gap-1.5">
              <span className="font-display text-[2.75rem] font-semibold leading-none">{current.reps}</span>
              <span className="mock-label">{session.reps}</span>
            </p>
            {current.load !== null && (
              <p className="flex items-baseline gap-1.5">
                <span className="font-display text-[2.75rem] font-semibold leading-none">{current.load}</span>
                <span className="mock-label">kg</span>
              </p>
            )}
          </div>
          <div className="mock-label mt-4 flex h-10 items-center justify-between rounded-full bg-void px-4 text-white">
            {session.logSet}
            <FoundationIcon name="success" size="xs" className="text-bolt" decorative />
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
          <span className="mock-eyebrow hidden text-white/56 sm:block">{copy.dashboardOrganization}</span>
          <span className="flex size-7 items-center justify-center rounded-full bg-bolt font-display text-xs font-bold text-void">N</span>
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
          <header>
            <p className="font-display text-2xl font-semibold uppercase leading-none sm:text-3xl">{copy.dashboardOverview}</p>
            <p className="mock-body mt-2 text-white/56">{copy.dashboardGreeting}</p>
          </header>

          <section className="studio-panel studio-shared">
            <div className="studio-shared-person">
              <span className="studio-shared-avatar">MR</span>
              <div className="min-w-0">
                <p className="mock-body font-semibold text-white/88">{copy.dashboardPerson}</p>
                <p className="mock-eyebrow mt-1 flex items-center gap-1.5 text-bolt">
                  <FoundationIcon name="permissions" size="xs" decorative />
                  {copy.dashboardShared}
                </p>
              </div>
            </div>

            <div className="studio-shared-week">
              <ol className="studio-week">
                {copy.dashboardWeekDays.map((day, index) => (
                  <li key={`${day}-${index}`} className={cn("studio-week-day", index === 4 && "studio-week-day-pending")}>
                    <span className="mock-mono">{day}</span>
                    <span className="studio-week-mark" />
                  </li>
                ))}
              </ol>
              <p className="mock-body mt-2 text-white/64">{copy.dashboardWeekSummary}</p>
            </div>
          </section>

          <div className="studio-content-grid">
            <section className="studio-panel">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <p className="mock-label text-white/72">{copy.dashboardAgenda}</p>
                <span className="mock-eyebrow text-bolt">{copy.dashboardViewAll}</span>
              </div>
              <div className="flex flex-col">
                {copy.dashboardSchedule.map(([time, session, detail]) => (
                  <div key={`${time}-${session}`} className="grid grid-cols-[42px_1fr_auto] items-center gap-2 border-b border-white/8 py-3 last:border-b-0">
                    <span className="mock-mono text-bolt">{time}</span>
                    <strong className="mock-body truncate font-semibold text-white/80">{session}</strong>
                    <span className="mock-body hidden text-white/56 sm:block">{detail}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="studio-panel studio-activity-panel">
              <p className="mock-label border-b border-white/10 pb-3 text-white/72">{copy.dashboardActivity}</p>
              <div className="flex flex-col">
                {copy.dashboardUpdates.map(([update, time]) => (
                  <div key={update} className="flex gap-2.5 border-b border-white/8 py-3 last:border-b-0">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-bolt" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="mock-body text-white/72">{update}</p>
                      <p className="mock-eyebrow mt-1 text-white/48">{time}</p>
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

/*
 * The Allfit Studio section's panel closes the story: Mariana finished the 18:00 session
 * in Allfit Space and Estudio Norte reviews it against the program it assigned. Plan and
 * log come from the same `spaceSession` data the Space phone shows; the one exercise that
 * differs is the panel's cyan. Studio reaches her history through the access she granted.
 */
export function StudioReviewMockup({ copy }: { copy: LocalizedContent }) {
  const review = copy.studioReview;
  const [exerciseColumn, planColumn, loggedColumn] = review.columns;

  return (
    <div className="studio-shell studio-review" aria-hidden="true">
      <div className="studio-topbar">
        <ProductWordmark product="studio" surface="dark" className="h-3.5 w-auto" />
        <div className="flex items-center gap-2.5">
          <span className="mock-eyebrow hidden text-white/56 sm:block">{copy.dashboardOrganization}</span>
          <span className="flex size-7 items-center justify-center rounded-full bg-bolt font-display text-xs font-bold text-void">N</span>
        </div>
      </div>

      <div className="studio-workspace">
        <aside className="studio-sidebar">
          {copy.dashboardNavigation.map((item, index) => (
            <div key={item} className={cn("studio-nav-item", index === 1 && "studio-nav-item-active")}>
              <FoundationIcon name={dashboardIcons[index]} size="xs" decorative />
              <span>{item}</span>
            </div>
          ))}
        </aside>

        <div className="studio-main">
          <header className="studio-review-head">
            <div className="studio-shared-person">
              <span className="studio-shared-avatar">MR</span>
              <div className="min-w-0">
                <p className="mock-eyebrow text-white/48">{copy.dashboardNavigation[1]}</p>
                <p className="mt-1 font-display text-2xl font-semibold uppercase leading-none sm:text-3xl">{copy.dashboardPerson}</p>
              </div>
            </div>
            <span className="studio-review-action mock-label">
              {review.action}
              <FoundationIcon name="forward" size="xs" decorative />
            </span>
          </header>

          <div className="studio-review-grid">
            <section className="studio-panel">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-white/10 pb-3">
                <p className="mock-label text-white/88">{copy.phoneSession}</p>
                <p className="mock-body text-white/56">{review.status}</p>
              </div>
              <div className="studio-review-row studio-review-columns mock-eyebrow">
                <span>{exerciseColumn}</span>
                <span>{planColumn}</span>
                <span>{loggedColumn}</span>
                <span />
              </div>
              {copy.spaceSession.exercises.map((exercise) => {
                const fewer = Number(exercise.reps) - Number(exercise.logged);
                const note = fewer > 0 ? review.fewerReps.replace("{n}", String(fewer)) : null;
                return (
                  <div key={exercise.name} className="studio-review-row">
                    <span className="mock-body font-semibold text-white/88">{exercise.name}</span>
                    <span className="mock-body tabular-nums text-white/56">
                      <span className="studio-review-cell-label mock-eyebrow">{planColumn}</span>
                      {exerciseTarget(exercise)}
                    </span>
                    <span className={cn("mock-body tabular-nums", note ? "text-white" : "text-white/56")}>
                      <span className="studio-review-cell-label mock-eyebrow">{loggedColumn}</span>
                      {exerciseTarget({ ...exercise, reps: exercise.logged })}
                    </span>
                    {note ? (
                      <span className="mock-eyebrow text-bolt">{note}</span>
                    ) : (
                      <span className="mock-eyebrow flex items-center gap-1.5 text-white/48">
                        <FoundationIcon name="success" size="xs" decorative />
                        {review.asPlanned}
                      </span>
                    )}
                  </div>
                );
              })}
            </section>

            <div className="flex flex-col gap-3">
              <section className="studio-panel">
                <p className="mock-eyebrow text-white/48">{review.programLabel}</p>
                <p className="mock-label mt-2 text-white/88">{review.program}</p>
                <p className="mock-body mt-1 text-white/56">{review.programWeek}</p>
              </section>
              <section className="studio-panel">
                <p className="mock-eyebrow text-white/48">{review.accessLabel}</p>
                <p className="mock-label mt-2 flex items-center gap-1.5 text-white/88">
                  <FoundationIcon name="permissions" size="xs" className="text-bolt" decorative />
                  {review.access}
                </p>
                <p className="mock-body mt-1 text-white/56">{review.accessPurpose}</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
