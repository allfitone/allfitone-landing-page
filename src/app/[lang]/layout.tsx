import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import { StructuredData } from "@/components/structured-data";
import { isLanguage, languages, ogLocales } from "@/lib/content";
import { display, body } from "@/lib/fonts";
import { languageAlternates, localizedPath, shareImage, siteConfig } from "@/lib/site-config";

import "../cascade-layers.css";
import "@allfitone/react/tokens.css";
import "@allfitone/react/app.css";
import "@allfitone/react/styles.css";
import "../globals.css";

/** Only the published languages exist; any other first segment is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const seo = siteConfig.seo[lang];

  return {
    metadataBase: new URL(siteConfig.url),
    title: seo.title,
    description: seo.description,
    applicationName: siteConfig.name,
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "Fitness ecosystem",
    alternates: { canonical: localizedPath(lang), languages: languageAlternates() },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      url: localizedPath(lang),
      siteName: siteConfig.name,
      title: seo.title,
      description: seo.description,
      locale: ogLocales[lang],
      alternateLocale: languages.filter((language) => language !== lang).map((language) => ogLocales[language]),
      images: [shareImage(lang)],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [shareImage(lang)],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#030713",
  colorScheme: "dark",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  return (
    <html lang={lang} data-afo-theme="dark" className={`${display.variable} ${body.variable} scroll-smooth antialiased`}>
      <body suppressHydrationWarning>
        <StructuredData language={lang} />
        {children}
      </body>
    </html>
  );
}
