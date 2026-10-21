import { notFound } from "next/navigation";

import { LandingPage } from "@/components/landing-page";
import { isLanguage } from "@/lib/content";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  return <LandingPage language={lang} />;
}
