/*
 * Every page title separates its parts with « | »: «Allfit One | El ecosistema donde el
 * fitness se conecta», «Privacidad de analítica | Allfit One», «William Vergel |
 * Embajador de Allfit One». Never «-», «–», «—» or «·»; the owner set this as a general
 * rule in November 2026. The module has no imports, so the ambassador schema can use it
 * from the Node scripts in `scripts/ambassadors/` as well as from the site.
 */

/** Matches a separator other than « | » between two parts of a title. */
export const foreignTitleSeparator = /\s[-–—·]\s/;
