import type { Metadata } from "next";

import { NotFoundView } from "@/components/not-found-view";
import { body, display } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";

import "./cascade-layers.css";
import "@allfitone/react/tokens.css";
import "@allfitone/react/app.css";
import "@allfitone/react/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `Page not found | ${siteConfig.name}`,
};

/** URLs outside the language routes skip the language root layout, so this page brings its own document. */
export default function GlobalNotFound() {
  return (
    <html lang="en" data-afo-theme="dark" className={`${display.variable} ${body.variable} antialiased`}>
      <body>
        <NotFoundView />
      </body>
    </html>
  );
}
