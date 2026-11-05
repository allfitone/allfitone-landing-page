import type { Language } from "@/lib/content";
import { productSiteUrl, siteConfig } from "@/lib/site-config";

const descriptions = {
  es: {
    organization:
      "Allfit One conecta personas, profesionales y organizaciones mediante productos para vivir y gestionar el fitness.",
    space:
      "Reúne tu plan, tus sesiones y tu progreso en un solo lugar, para entrenar por tu cuenta o con la planificación de un profesional.",
    studio:
      "Panel para que profesionales y organizaciones gestionen clientes, entrenamiento, progreso, equipo y los planes que venden.",
  },
  en: {
    organization:
      "Allfit One connects people, professionals and organizations through products to live and manage fitness.",
    space:
      "Brings your plan, sessions and progress into one place, to train on your own or follow a professional's plan.",
    studio:
      "Dashboard for professionals and organizations to manage clients, training, progress, team and the plans they sell.",
  },
} as const satisfies Record<Language, { organization: string; space: string; studio: string }>;

/** The @id each product's own landing gives its app; sharing it lets search engines merge both into one entity. */
function productId(product: keyof typeof siteConfig.products) {
  return `${siteConfig.products[product]}/#app`;
}

function buildStructuredData(language: Language) {
  const copy = descriptions[language];
  const organization = { "@id": `${siteConfig.url}/#organization` };

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
        publisher: organization,
      },
      {
        "@type": "MobileApplication",
        "@id": productId("space"),
        name: "Allfit Space",
        url: productSiteUrl("space", language),
        description: copy.space,
        applicationCategory: "HealthApplication",
        inLanguage: language,
        publisher: organization,
      },
      {
        "@type": "WebApplication",
        "@id": productId("studio"),
        name: "Allfit Studio",
        url: productSiteUrl("studio", language),
        description: copy.studio,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: language,
        publisher: organization,
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
