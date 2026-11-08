import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WaitlistPage } from "@/components/waitlist-page";
import { isLanguage, languages, ogLocales, waitlistPageContent } from "@/lib/content";
import { languageAlternates, localizedPath, shareImage, siteConfig } from "@/lib/site-config";
import { waitlistOpen, waitlistPagePath } from "@/lib/waitlist";


export async function generateMetadata({ params }: PageProps<"/[lang]/waitlist">): Promise<Metadata> {
  const { lang } = await params;
  if (!waitlistOpen || !isLanguage(lang)) notFound();
  const { metaTitle, metaDescription } = waitlistPageContent[lang];
  const url = localizedPath(lang, waitlistPagePath);
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: url, languages: languageAlternates(waitlistPagePath) },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: metaTitle,
      description: metaDescription,
      locale: ogLocales[lang],
      alternateLocale: languages.filter((other) => other !== lang).map((other) => ogLocales[other]),
      images: [shareImage(lang)],
    },
    twitter: { card: "summary_large_image", title: metaTitle, description: metaDescription, images: [shareImage(lang)] },
  };
}

/**
 * Where every «Únete a la lista» action leads: the launch offer, its terms and the form.
 * While the waitlist is closed (`waitlistOpen`), the page answers as not found.
 */
export default async function WaitlistRoute({ params }: PageProps<"/[lang]/waitlist">) {
  const { lang } = await params;
  if (!waitlistOpen || !isLanguage(lang)) notFound();
  return <WaitlistPage language={lang} />;
}
