/**
 * How the production edge answers a path: the same rules the CloudFront
 * Function applies in front of the exported site (allfitone repository,
 * `infra/modules/static-site`). Kept here so the E2E suite runs against the
 * exported files with production's redirects and clean URLs; a change to the
 * redirects goes in both places.
 */

export interface Redirect {
  location: string;
  status: 307 | 308;
}

export const redirects: Record<string, Redirect> = {
  // Temporary, so the root can later negotiate the visitor's language without cached redirects.
  "/": { location: "/es", status: 307 },
  // Pages published before language prefixes keep their links working.
  "/privacy/analytics": { location: "/es/privacy/analytics", status: 308 },
  "/ambassadors/william": { location: "/es/ambassadors/william", status: 308 },
};

export type EdgeAnswer = { redirect: string; status: number } | { file: string };

export function edgeAnswer(path: string): EdgeAnswer {
  const target = redirects[path];
  if (target) return { redirect: target.location, status: target.status };
  if (path.length > 1 && path.endsWith("/")) return { redirect: path.slice(0, -1), status: 301 };
  if (path === "/") return { file: "/index.html" };
  return { file: path.lastIndexOf(".") <= path.lastIndexOf("/") ? `${path}.html` : path };
}
