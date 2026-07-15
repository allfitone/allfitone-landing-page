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
        "Allfit One crea productos para conectar entrenamiento, gestión y progreso. Su primer producto es Allfit OS.",
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
      "@id": `${siteConfig.url}/#allfit-os`,
      name: "Allfit OS",
      url: `${siteConfig.url}/#features`,
      description:
        "Software fitness para gestionar clientes, rutinas, reservas, pagos, membresías, progreso y métricas desde un solo sistema.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      provider: { "@id": `${siteConfig.url}/#organization` },
      offers: {
        "@type": "Offer",
        price: "30",
        priceCurrency: "USD",
        url: `${siteConfig.url}/#pricing`,
        description: "Plan mensual desde 30 USD con hasta 5 clientes activos y un miembro del equipo.",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.url}/#faq`,
      inLanguage: "es",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué es Allfit OS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Un sistema operativo digital para negocios fitness. Integra página, panel de control y aplicación web para clientes en una sola plataforma.",
          },
        },
        {
          "@type": "Question",
          name: "¿Para quién está pensado?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Para entrenadores, gimnasios, estudios y marcas de entrenamiento que quieren gestionar y hacer crecer su negocio con una experiencia digital profesional.",
          },
        },
        {
          "@type": "Question",
          name: "¿Puedo usar mi propia marca?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. Allfit OS puede personalizarse con tu logo, colores, contenido y experiencia de marca.",
          },
        },
        {
          "@type": "Question",
          name: "¿Mis clientes deben descargar una app?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No necesariamente. La experiencia puede funcionar como aplicación web desde el celular, sin pasar por una tienda de aplicaciones.",
          },
        },
        {
          "@type": "Question",
          name: "¿Incluye configuración inicial?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. Te ayudamos a configurar tu ecosistema digital para que puedas empezar a usar Allfit OS más rápido.",
          },
        },
      ],
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
