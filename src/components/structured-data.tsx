import { siteConfig } from "@/lib/site-config";

const structuredData = {
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
      description:
        "Allfit One conecta personas, profesionales y organizaciones mediante productos para vivir y gestionar el fitness.",
      sameAs: [siteConfig.social.instagram, siteConfig.social.tiktok],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: ["es", "en"],
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteConfig.url}/#allfit-studio`,
      name: "Allfit Studio",
      url: `${siteConfig.url}/#allfit-studio`,
      description:
        "Panel administrativo para que profesionales y organizaciones gestionen clientes, entrenamientos, agenda, membresías y progreso.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      provider: { "@id": `${siteConfig.url}/#organization` },
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
