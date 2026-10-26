import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AmbassadorLanding } from "@/components/ambassadors/ambassador-landing";
import { ambassadorPath, getAmbassador, visibleAmbassadors } from "@/lib/ambassadors/registry";
import { isLanguage, ogLocales } from "@/lib/content";
import { localizedPath, shareImage, siteConfig } from "@/lib/site-config";

/** Only visible profiles get a route; any other slug answers with a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return visibleAmbassadors().map(({ slug }) => ({ slug }));
}

/**
 * Ambassador pages hold proposals that are not approved for search, so every one
 * stays noindex and out of the sitemap, published or not. Opening them to search
 * needs a product decision, plus hreflang alternates and sitemap entries.
 */
export async function generateMetadata({ params }: PageProps<"/[lang]/ambassadors/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const profile = getAmbassador(slug);
  if (!isLanguage(lang) || !profile) notFound();
  const copy = profile.content[lang];
  const url = localizedPath(lang, ambassadorPath(profile.slug));

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: { canonical: url },
    robots: { index: false, follow: false },
    openGraph: {
      type: "profile",
      url,
      siteName: siteConfig.name,
      title: copy.metaTitle,
      description: copy.metaDescription,
      locale: ogLocales[lang],
      images: [shareImage(lang)],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metaTitle,
      description: copy.metaDescription,
      images: [shareImage(lang)],
    },
  };
}

export default async function AmbassadorPage({ params }: PageProps<"/[lang]/ambassadors/[slug]">) {
  const { lang, slug } = await params;
  const profile = getAmbassador(slug);
  if (!isLanguage(lang) || !profile) notFound();

  return <AmbassadorLanding profile={profile} language={lang} />;
}
