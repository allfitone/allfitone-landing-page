import type { Language } from "@/lib/content";
import type { LegalText } from "@/lib/legal/documents";

/*
 * The terms and conditions: one document for Allfit Space and Allfit Studio, with a
 * section for each product. It replaced the Allfit Space draft that lived on
 * space.allfit.one in November 2026. The company's registered name and tax id (NIT) join
 * the «Aceptación» section once the owner provides them.
 */
export const termsAndConditions = {
  es: {
    metaTitle: "Términos y condiciones | Allfit One",
    metaDescription:
      "Las condiciones para usar Allfit One: Allfit Space, Allfit Pro y Allfit Studio, y cómo funcionan con gimnasios y entrenadores.",
    title: "Términos y condiciones",
    lead: "Las condiciones para usar Allfit Space y Allfit Studio. Al crear una cuenta o activar Allfit Studio, las aceptas.",
    contact: "Preguntas sobre estos términos",
    sections: [
      {
        id: "acceptance",
        title: "Aceptación",
        content: [
          "Estos términos rigen el uso de Allfit Space, Allfit Studio y www.allfit.one. Al crear una cuenta en Allfit Space o activar Allfit Studio, los aceptas.",
          "El servicio lo presta Allfit One, con domicilio en Colombia.",
        ],
      },
      {
        id: "eligibility",
        title: "Quién puede usar Allfit One",
        content: [
          "Debes tener 18 años o más y dar información verdadera. Tu cuenta es personal y eres responsable de lo que se haga con ella.",
        ],
      },
      {
        id: "space",
        title: "Allfit Space",
        content: [
          "Allfit Space te permite seguir programas de entrenamiento, registrar tus sesiones y tu nutrición no clínica, y compartir lo que elijas con tu gimnasio o entrenador.",
          "La app no ofrece consejo médico ni nutricional clínico. Consulta a un profesional de la salud antes de empezar un programa si tienes cualquier condición médica.",
        ],
      },
      {
        id: "pro",
        title: "Allfit Pro",
        content: [
          "Allfit Space es gratis. Allfit Pro es una suscripción opcional que se contrata desde la app, a través de la tienda de tu teléfono, con sus condiciones de pago y cancelación.",
          "Si tu gimnasio usa Allfit Studio, Pro te sale incluido mientras sigas activo con ellos. Si Pro termina, conservas todo tu historial.",
        ],
      },
      {
        id: "studio",
        title: "Allfit Studio",
        content: [
          "Allfit Studio es el sistema con el que entrenadores, gimnasios y estudios gestionan a sus clientes, su entrenamiento y su operación.",
          "Los gimnasios y entrenadores son independientes de Allfit One y responden por el servicio que prestan. Ese servicio y sus cobros se rigen por lo que acuerden con cada cliente; Allfit One no recibe ni maneja ese dinero.",
          "Un gimnasio o entrenador solo ve los datos que cada cliente le autoriza, y debe usarlos para el propósito autorizado.",
        ],
      },
      {
        id: "your-data",
        title: "Tus datos",
        content: [
          "Tus datos son tuyos. Nos permites guardarlos y procesarlos solo para prestarte el servicio. Cómo los tratamos está en la política de privacidad.",
        ],
        link: "privacy",
      },
      {
        id: "acceptable-use",
        title: "Uso aceptable",
        content: [
          "No uses Allfit One para fines ilícitos, para acceder a cuentas ajenas ni para afectar su funcionamiento.",
        ],
      },
      {
        id: "closing",
        title: "Cierre de la cuenta",
        content: [
          "Puedes dejar de usar Allfit One y pedirnos que cerremos tu cuenta cuando quieras. Podemos suspender una cuenta que incumpla estos términos.",
        ],
      },
      {
        id: "liability",
        title: "Responsabilidad",
        content: [
          "Entrenar implica riesgos físicos que asumes al seguir un programa. Allfit One responde en los términos de la ley colombiana aplicable.",
        ],
      },
      {
        id: "changes",
        title: "Cambios y ley aplicable",
        content: [
          "Si cambiamos estos términos, publicaremos la nueva versión aquí y te avisaremos en la app antes de que entre en vigor.",
          "Estos términos se rigen por las leyes de la República de Colombia. Si esta versión y la versión en inglés difieren, prevalece la versión en español.",
        ],
      },
    ],
  },
  en: {
    metaTitle: "Terms and conditions | Allfit One",
    metaDescription:
      "The terms for using Allfit One: Allfit Space, Allfit Pro and Allfit Studio, and how they work with gyms and coaches.",
    title: "Terms and conditions",
    lead: "The terms for using Allfit Space and Allfit Studio. By creating an account or activating Allfit Studio, you accept them.",
    contact: "Questions about these terms",
    sections: [
      {
        id: "acceptance",
        title: "Acceptance",
        content: [
          "These terms govern the use of Allfit Space, Allfit Studio and www.allfit.one. By creating an Allfit Space account or activating Allfit Studio, you accept them.",
          "The service is provided by Allfit One, domiciled in Colombia.",
        ],
      },
      {
        id: "eligibility",
        title: "Who can use Allfit One",
        content: [
          "You must be 18 or over and give truthful information. Your account is personal and you are responsible for what is done with it.",
        ],
      },
      {
        id: "space",
        title: "Allfit Space",
        content: [
          "Allfit Space lets you follow training programs, log your sessions and your non-clinical nutrition, and share what you choose with your gym or coach.",
          "The app does not give medical or clinical nutrition advice. See a health professional before starting a program if you have any medical condition.",
        ],
      },
      {
        id: "pro",
        title: "Allfit Pro",
        content: [
          "Allfit Space is free. Allfit Pro is an optional subscription bought in the app through your phone's store, under that store's payment and cancellation terms.",
          "If your gym uses Allfit Studio, Pro is included while you stay active with them. If Pro ends, you keep your whole history.",
        ],
      },
      {
        id: "studio",
        title: "Allfit Studio",
        content: [
          "Allfit Studio is the system coaches, gyms and studios use to manage their clients, their training and their operation.",
          "Gyms and coaches are independent of Allfit One and answer for the service they provide. That service and its charges are governed by what they agree with each client; Allfit One does not receive or handle that money.",
          "A gym or coach only sees the data each client authorizes, and must use it for the authorized purpose.",
        ],
      },
      {
        id: "your-data",
        title: "Your data",
        content: [
          "Your data is yours. You allow us to store and process it only to provide the service. How we handle it is in the privacy policy.",
        ],
        link: "privacy",
      },
      {
        id: "acceptable-use",
        title: "Acceptable use",
        content: [
          "Do not use Allfit One for unlawful purposes, to access other people's accounts or to disrupt how it works.",
        ],
      },
      {
        id: "closing",
        title: "Closing your account",
        content: [
          "You can stop using Allfit One and ask us to close your account at any time. We may suspend an account that breaches these terms.",
        ],
      },
      {
        id: "liability",
        title: "Liability",
        content: [
          "Training carries physical risks that you take on when you follow a program. Allfit One is liable as provided by applicable Colombian law.",
        ],
      },
      {
        id: "changes",
        title: "Changes and governing law",
        content: [
          "If we change these terms, we will publish the new version here and tell you in the app before it takes effect.",
          "These terms are governed by the laws of the Republic of Colombia. If this version and the Spanish version differ, the Spanish version prevails.",
        ],
      },
    ],
  },
} as const satisfies Record<Language, LegalText>;
