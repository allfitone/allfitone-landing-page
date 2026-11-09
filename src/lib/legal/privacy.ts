import type { Language } from "@/lib/content";
import type { LegalText } from "@/lib/legal/documents";

/*
 * The privacy policy: one for all of Allfit One (Allfit Space, Allfit Studio and this
 * site, waitlist included), under Colombia's Ley 1581 de 2012. It replaced the draft that
 * lived on space.allfit.one in November 2026. The company's registered name, tax id
 * (NIT) and address join the «Quién es responsable» section once the owner provides them.
 */
export const privacyPolicy = {
  es: {
    metaTitle: "Política de privacidad | Allfit One",
    metaDescription:
      "Qué datos personales trata Allfit One, para qué los usa, qué compartes con gimnasios y entrenadores, y cómo ejerces tus derechos según la Ley 1581 de 2012.",
    title: "Política de privacidad",
    lead: "Cómo tratamos tus datos personales en Allfit Space, Allfit Studio y este sitio, conforme a la Ley 1581 de 2012.",
    contact: "Consultas y reclamos sobre tus datos",
    sections: [
      {
        id: "controller",
        title: "Quién es responsable",
        content: [
          "El responsable del tratamiento de tus datos personales es Allfit One, con domicilio en Colombia.",
          "Para consultas, reclamos o cualquier solicitud sobre tus datos, escríbenos a hello@allfit.one.",
          "Esta política sigue la Ley 1581 de 2012 y el Decreto 1377 de 2013, compilado en el Decreto 1074 de 2015.",
        ],
      },
      {
        id: "scope",
        title: "A qué se aplica",
        content: [
          "A Allfit Space, la app personal; a Allfit Studio, el sistema para entrenadores, gimnasios y estudios; y a www.allfit.one, incluida su lista de espera.",
        ],
      },
      {
        id: "data",
        title: "Qué datos tratamos",
        content: [
          "Según cómo uses Allfit One, tratamos:",
          [
            "Identificación y contacto: nombre, apellido, correo y, si lo das, tu celular.",
            "Entrenamiento: programas, sesiones, series, cargas, tiempos y récords.",
            "Nutrición no clínica: comidas, alimentos, nutrientes y, si las subes, fotos de tus comidas.",
            "Progreso corporal y contexto de salud, solo si decides registrarlos. Son datos sensibles: darlos es opcional y nunca condiciona el uso de la app.",
            "En Allfit Studio, los datos de tu negocio y de tu equipo, y los de tus clientes que ellos te autoricen ver.",
            "En la lista de espera de Allfit Space, tu nombre, tu correo, el código de quien te invitó y, para descartar registros repetidos, la conexión y el dispositivo desde los que te uniste.",
          ],
        ],
      },
      {
        id: "purposes",
        title: "Para qué los usamos",
        content: [
          [
            "Prestarte el servicio: guardar tu historial, mostrarte tu progreso y proponerte programas.",
            "Compartir con un gimnasio o entrenador exactamente las categorías que tú autorices, y solo mientras las autorices.",
            "Proteger tu cuenta, darte soporte y cumplir obligaciones legales.",
            "Si te uniste a la lista de espera: avisarte cuando abra Allfit Space, confirmar tu lugar entre los Founding Members y contar las personas que se unen con tu link.",
          ],
          "No vendemos tus datos ni los usamos para publicidad de terceros.",
        ],
      },
      {
        id: "sharing",
        title: "Lo que compartes con gimnasios y entrenadores",
        content: [
          "Aceptar a un gimnasio o entrenador no comparte ningún dato por sí solo. Tú eliges qué categorías ve, una por una.",
          "Puedes retirar cualquier permiso en cualquier momento desde la app. Desde ese instante deja de verlo, y lo demás que compartes no cambia.",
          "Si terminas la relación, tu historial sigue siendo tuyo y sigue en tu cuenta.",
        ],
      },
      {
        id: "analytics",
        title: "Analítica opcional",
        content: [
          "Solo medimos cómo funcionan las apps si lo aceptas, y nunca leemos tu contenido ni tus datos de entrenamiento, salud o nutrición. Puedes retirar el permiso cuando quieras.",
        ],
        link: "analytics",
      },
      {
        id: "providers",
        title: "Proveedores y transferencias",
        content: [
          "Usamos proveedores de infraestructura en la nube que pueden alojar datos fuera de Colombia, con garantías adecuadas de protección. La analítica opcional se procesa en PostHog, en Estados Unidos.",
          "Nuestros proveedores tratan los datos solo para prestarnos su servicio.",
        ],
      },
      {
        id: "security",
        title: "Seguridad y conservación",
        content: [
          "Protegemos tus datos con controles técnicos y organizativos, y cada acceso autorizado a ellos queda registrado.",
          "Conservamos tus datos mientras tengas una cuenta activa y durante los plazos que exija la ley. Los de la lista de espera, hasta que nos pidas borrarlos.",
        ],
      },
      {
        id: "rights",
        title: "Tus derechos",
        content: [
          "Conocer, actualizar y rectificar tus datos; pedir prueba de la autorización; saber cómo se han usado; revocar la autorización o pedir la supresión cuando no exista un deber legal de conservarlos; y presentar quejas ante la Superintendencia de Industria y Comercio.",
        ],
      },
      {
        id: "requests",
        title: "Cómo ejercerlos",
        content: [
          "Escríbenos a hello@allfit.one desde el correo de tu cuenta o identifícate en el mensaje. Verificaremos tu solicitud sin pedirte que publiques datos sensibles.",
          "Respondemos las consultas en un máximo de diez días hábiles y los reclamos en un máximo de quince días hábiles, en los términos de la ley.",
        ],
      },
      {
        id: "age",
        title: "Edad mínima",
        content: ["Allfit One es solo para personas de 18 años o más."],
      },
      {
        id: "changes",
        title: "Cambios a esta política",
        content: [
          "Si cambiamos esta política, publicaremos la nueva versión aquí y te avisaremos en la app antes de que los cambios importantes entren en vigor.",
          "Si esta versión y la versión en inglés difieren, prevalece la versión en español.",
        ],
      },
    ],
  },
  en: {
    metaTitle: "Privacy policy | Allfit One",
    metaDescription:
      "Which personal data Allfit One processes, why, what you share with gyms and coaches, and how you exercise your rights under Colombia's Ley 1581 de 2012.",
    title: "Privacy policy",
    lead: "How we handle your personal data in Allfit Space, Allfit Studio and this site, under Colombia's Ley 1581 de 2012.",
    contact: "Questions and claims about your data",
    sections: [
      {
        id: "controller",
        title: "Who is responsible",
        content: [
          "The controller of your personal data is Allfit One, domiciled in Colombia.",
          "For questions, claims or any request about your data, write to hello@allfit.one.",
          "This policy follows Colombia's Ley 1581 de 2012 and Decreto 1377 de 2013, compiled in Decreto 1074 de 2015.",
        ],
      },
      {
        id: "scope",
        title: "What it covers",
        content: [
          "Allfit Space, the personal app; Allfit Studio, the system for coaches, gyms and studios; and www.allfit.one, including its waitlist.",
        ],
      },
      {
        id: "data",
        title: "The data we process",
        content: [
          "Depending on how you use Allfit One, we process:",
          [
            "Identification and contact: first name, last name, email and, if you give it, your phone number.",
            "Training: programs, sessions, sets, loads, times and records.",
            "Non-clinical nutrition: meals, foods, nutrients and, if you upload them, photos of your meals.",
            "Body progress and health context, only if you choose to log them. These are sensitive data: giving them is optional and never a condition for using the app.",
            "In Allfit Studio, your business and team data, and the data of your clients that they authorize you to see.",
            "On the Allfit Space waitlist, your name, your email, the code of whoever invited you and, to rule out repeated sign-ups, the connection and device you joined from.",
          ],
        ],
      },
      {
        id: "purposes",
        title: "What we use them for",
        content: [
          [
            "To provide the service: keep your history, show your progress and suggest programs.",
            "To share with a gym or coach exactly the categories you authorize, and only while you authorize them.",
            "To protect your account, support you and meet legal obligations.",
            "If you joined the waitlist: to tell you when Allfit Space opens, confirm your place among the Founding Members and count the people who join through your link.",
          ],
          "We do not sell your data or use it for third-party advertising.",
        ],
      },
      {
        id: "sharing",
        title: "What you share with gyms and coaches",
        content: [
          "Accepting a gym or coach shares no data on its own. You choose which categories they see, one by one.",
          "You can withdraw any permission at any time from the app. From that moment they stop seeing it, and the rest of what you share does not change.",
          "If the relationship ends, your history is still yours and stays in your account.",
        ],
      },
      {
        id: "analytics",
        title: "Optional analytics",
        content: [
          "We only measure how the apps work if you agree, and we never read your content or your training, health or nutrition data. You can withdraw your permission whenever you want.",
        ],
        link: "analytics",
      },
      {
        id: "providers",
        title: "Providers and transfers",
        content: [
          "We use cloud infrastructure providers that may host data outside Colombia, with adequate protection safeguards. Optional analytics is processed by PostHog, in the United States.",
          "Our providers process data only to provide their service to us.",
        ],
      },
      {
        id: "security",
        title: "Security and retention",
        content: [
          "We protect your data with technical and organizational controls, and every authorized access to it is logged.",
          "We keep your data while you have an active account and for the periods the law requires. Waitlist data, until you ask us to delete it.",
        ],
      },
      {
        id: "rights",
        title: "Your rights",
        content: [
          "To know, update and correct your data; to ask for proof of your authorization; to know how it has been used; to revoke your authorization or ask for deletion when there is no legal duty to keep it; and to file complaints with Colombia's Superintendencia de Industria y Comercio.",
        ],
      },
      {
        id: "requests",
        title: "How to exercise them",
        content: [
          "Write to hello@allfit.one from your account's email or identify yourself in the message. We will verify your request without asking you to publish sensitive data.",
          "We answer questions within ten business days at most and claims within fifteen business days at most, as the law provides.",
        ],
      },
      {
        id: "age",
        title: "Minimum age",
        content: ["Allfit One is only for people aged 18 or over."],
      },
      {
        id: "changes",
        title: "Changes to this policy",
        content: [
          "If we change this policy, we will publish the new version here and tell you in the app before significant changes take effect.",
          "If this version and the Spanish version differ, the Spanish version prevails.",
        ],
      },
    ],
  },
} as const satisfies Record<Language, LegalText>;
