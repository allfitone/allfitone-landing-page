import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import "./globals.css";

const display = Barlow_Condensed({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700", "800"] });
const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Allfit One — All the fitness in one place.",
  description: "Personas, entrenamiento y progreso conectados. Descubre Allfit OS, el primer producto del ecosistema Allfit One.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} scroll-smooth antialiased`}>
      <body>{children}</body>
    </html>
  );
}
