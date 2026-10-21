import type { Language } from "@/lib/content";
import { localizedPath, siteConfig } from "@/lib/site-config";

const descriptions = {
  es: {
    organization:
      "Allfit One conecta personas, profesionales y organizaciones mediante productos para vivir y gestionar el fitness.",
    studio:
      "Panel administrativo para que profesionales y organizaciones gestionen clientes, entrenamientos, agenda, membresías y progreso.",
  },
  en: {
    organization:
      "Allfit One connects people, professionals and organizations through products to live and manage fitness.",
    studio:
      "Administrative dashboard for professionals and organizations to manage clients, training, schedules, memberships and progress.",
  },
} as const satisfies Record<Language, { organization: string; studio: string }>;

function buildStructuredData(language: Language) {
  const copy = descriptions[language];
  const homeUrl = `${siteConfig.url}${localizedPath(language)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/brand/allfit-one-avatar.png`,
          width: 1080,
          height: 1080,
        },
        email: siteConfig.email,
        description: copy.organization,
        sameAs: [siteConfig.social.instagram, siteConfig.social.tiktok, siteConfig.social.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.seo[language].description,
        inLanguage: ["es", "en"],
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteConfig.url}/#allfit-studio`,
        name: "Allfit Studio",
        url: `${homeUrl}#allfit-studio`,
        description: copy.studio,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: language,
        provider: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };
}

export function StructuredData({ language }: { language: Language }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildStructuredData(language)).replace(/</g, "\\u003c"),
      }}
    />
  );
}
