/**
 * Serves `out/` for the E2E suite the way CloudFront serves it in production:
 * edge redirects, clean URLs mapped to the exported `.html`, and the site's own
 * 404 page for anything that does not exist.
 *
 *   node scripts/static/serve.mts --port 3100
 */

import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

import { edgeAnswer } from "./edge-rules.mts";

const root = path.resolve("out");
const portFlag = process.argv.indexOf("--port");
const port = Number(portFlag === -1 ? 3100 : process.argv[portFlag + 1]);

const types: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};

async function isFile(file: string): Promise<boolean> {
  return (await stat(file).catch(() => undefined))?.isFile() ?? false;
}

createServer(async (request, response) => {
  const { pathname } = new URL(request.url ?? "/", "http://localhost");
  const answer = edgeAnswer(decodeURIComponent(pathname));
  if ("redirect" in answer) {
    response.writeHead(answer.status, { location: answer.redirect }).end();
    return;
  }
  const file = path.join(root, path.normalize(answer.file));
  const found = file.startsWith(root) && (await isFile(file));
  const served = found ? file : path.join(root, "404.html");
  response.writeHead(found ? 200 : 404, {
    "content-type": types[path.extname(served)] ?? "application/octet-stream",
  });
  createReadStream(served).pipe(response);
}).listen(port, "127.0.0.1", () => console.log(`Serving out/ on http://127.0.0.1:${port}`));
