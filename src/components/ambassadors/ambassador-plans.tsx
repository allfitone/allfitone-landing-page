import { buttonVariants } from "@allfitone/react/components/button";
import { cn } from "@allfitone/react/lib/utils";

import { ambassadorContactHref } from "@/lib/ambassadors/contact";
import { formatPesos, monthlyPrice, planDuration, savingPercent } from "@/lib/ambassadors/pricing";
import type { AmbassadorProfile } from "@/lib/ambassadors/schema";
import { ambassadorPageContent, type Language } from "@/lib/content";

export function AmbassadorPlans({ profile, language }: { profile: AmbassadorProfile; language: Language }) {
  const copy = profile.content[language];
  const ui = ambassadorPageContent[language];
  const basePlan = profile.plans.find((plan) => plan.id === profile.basePlanId);

  return (
    <section className="ambassador-plans" aria-labelledby="ambassador-plans-title">
      <div className="site-grid ambassador-plans-head">
        <h2 id="ambassador-plans-title" className="section-title text-void col-span-12 lg:col-span-6">
          {copy.plansTitle}
        </h2>
        <p className="section-lead ambassador-plans-lead col-span-12 lg:col-span-4 lg:col-start-9">
          {copy.plansLead}
        </p>
      </div>

      <div className="site-grid">
        <div className="plans-panel col-span-12" data-plan-count={profile.plans.length}>
          {profile.plans.map((plan) => {
            const planCopy = plan.copy[language];
            const saving = basePlan ? savingPercent(plan, basePlan) : null;

            return (
              <article key={plan.id} className={cn("plan", plan.featured && "plan-featured")}>
                {plan.featured && (
                  <p className="plan-tag">
                    {ui.featuredTag}
                  </p>
                )}
                <h3 className="plan-name">
                  {planCopy.name}
                </h3>
                <p className="plan-who">
                  {planCopy.who}
                </p>

                <p className="plan-price">
                  {formatPesos(plan.priceCOP, language)}
                  <span className="plan-currency">COP</span>
                </p>
                <p className="plan-meta">
                  {ui.perMonth.replace("{amount}", formatPesos(monthlyPrice(plan), language))}
                  {basePlan && saving !== null && (
                    <span className="plan-saving">
                      {ui.saving.replace("{percent}", String(saving)).replace("{basePlan}", planDuration(basePlan.months, language))}
                    </span>
                  )}
                </p>

                <p className="plan-cadence">
                  {planCopy.cadence}
                </p>

                <div className="plan-includes">
                  <p className="plan-includes-lead">
                    {planCopy.includesLead}
                  </p>
                  <ul>
                    {planCopy.includes.map((item) => (
                      <li key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={ambassadorContactHref(profile, planCopy.name)}
                  className={cn(
                    buttonVariants({ variant: plan.featured ? undefined : "outline", size: "lg" }),
                    "plan-cta",
                  )}
                >
                  {planCopy.cta}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
