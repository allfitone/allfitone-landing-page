import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLockup } from "@allfitone/react/brand";

import { LanguageSwitch } from "@/components/language-switch";
import type { Language } from "@/lib/content";
import { legalChrome, legalDocumentSlugs, legalPath, type LegalDocumentSlug } from "@/lib/legal/documents";
import { localizedPath } from "@/lib/site-config";

/**
 * The header and footer every page outside the homepage shares: the legal pages. The
 * brand leads home in the page language; the footer lists the three legal documents and
 * the way home. Both sit on the homepage's 1500px frame.
 */
export function SubpageHeader({ language, children }: { language: Language; children?: ReactNode }) {
  const chrome = legalChrome[language];
  return (
    <header className="subpage-header">
      <div className="subpage-shell subpage-header-inner">
        <Link href={localizedPath(language)} className="subpage-brand" aria-label="Allfit One">
          <BrandLockup surface="dark" className="h-8 w-auto" aria-hidden="true" />
        </Link>
        <div className="subpage-header-actions">
          {children}
          <LanguageSwitch language={language} label={chrome.selectLanguage} />
        </div>
      </div>
    </header>
  );
}

export function SubpageFooter({ language, current }: { language: Language; current?: LegalDocumentSlug }) {
  const chrome = legalChrome[language];
  return (
    <footer className="subpage-footer">
      <div className="subpage-shell subpage-footer-inner">
        <BrandLockup surface="dark" className="h-7 w-auto" title="Allfit One" />
        <nav className="subpage-footer-nav" aria-label={chrome.documents}>
          {legalDocumentSlugs.map((document) => (
            <Link
              key={document}
              href={localizedPath(language, legalPath(document))}
              className="subpage-footer-link"
              aria-current={document === current ? "page" : undefined}
            >
              {chrome.names[document]}
            </Link>
          ))}
        </nav>
        <Link href={localizedPath(language)} className="subpage-home-link">
          {chrome.home}
        </Link>
      </div>
    </footer>
  );
}
