import { ProductWordmark } from "@allfitone/react/brand";
import { FoundationIcon, type IconName } from "@allfitone/react/icons";
import { cn } from "@allfitone/react/lib/utils";

import type { LocalizedContent } from "@/lib/content";
import { usePersonName, withPerson } from "@/lib/person";

const dashboardIcons = ["overview", "people", "training", "operation", "business"] as const satisfies readonly IconName[];

type ExerciseVolume = { sets: number; reps: string; load: number | null };

function exerciseTarget(exercise: ExerciseVolume) {
  return exercise.load === null
    ? `${exercise.sets} × ${exercise.reps}`
    : `${exercise.sets} × ${exercise.reps} · ${exercise.load} kg`;
}

/*
 * The Allfit Studio section's panel closes the story: the person finished the 18:00 session
 * in Allfit Space and Estudio Norte reviews it against the program it assigned. Plan and
 * log come from the `spaceSession` data; the one exercise that
 * differs is the panel's cyan. Studio reaches their history through the access they granted.
 */
export function StudioReviewMockup({ copy }: { copy: LocalizedContent }) {
  const review = copy.studioReview;
  const person = usePersonName();
  const [exerciseColumn, planColumn, loggedColumn] = review.columns;

  return (
    <div className="studio-shell studio-review" aria-hidden="true">
      <div className="studio-topbar">
        <ProductWordmark product="studio" surface="dark" className="h-3.5 w-auto" />
        <div className="flex items-center gap-2.5">
          <span className="mock-eyebrow hidden text-white/56 sm:block">{copy.studioOrganization}</span>
          <span className="flex size-7 items-center justify-center rounded-full bg-bolt font-display text-xs font-bold text-void">N</span>
        </div>
      </div>

      <div className="studio-workspace">
        <aside className="studio-sidebar">
          {copy.studioNavigation.map((item, index) => (
            <div key={item} className={cn("studio-nav-item", index === 1 && "studio-nav-item-active")}>
              <FoundationIcon name={dashboardIcons[index]} size="xs" decorative />
              <span>{item}</span>
            </div>
          ))}
        </aside>

        <div className="studio-main">
          <header className="studio-review-head">
            <div className="studio-shared-person">
              <span className="studio-shared-avatar">{person.charAt(0)}</span>
              <div className="min-w-0">
                <p className="mock-eyebrow text-white/48">{copy.studioNavigation[1]}</p>
                <p className="mt-1 font-display text-2xl font-semibold uppercase leading-none sm:text-3xl">{person}</p>
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
                <p className="mock-label text-white/88">{copy.sessionName}</p>
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
                <p className="mock-body mt-1 text-white/56">{withPerson(review.accessPurpose, person)}</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
