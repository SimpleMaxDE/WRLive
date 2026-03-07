import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const base = "https://wildlegends.net";
const seeds = ["/", "/guias", "/itens", "/tier-list", "/ranking", "/guia/Ahri"];

type CrawlRow = {
  route: string;
  status: number;
  title: string | null;
  description: string | null;
  headings: string[];
  internalLinks: string[];
  externalLinks: string[];
  fetchedAt: string;
};

function extractAll(re: RegExp, html: string) {
  const results: string[] = [];
  for (const m of html.matchAll(re)) results.push(m[1]);
  return results;
}

function clean(text: string) {
  return text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function crawlRoute(route: string): CrawlRow {
  const cmd = `curl -sSL -w "\\n%{http_code}" ${base}${route}`;
  const out = execSync(cmd, { encoding: "utf8", maxBuffer: 30 * 1024 * 1024 });
  const chunks = out.split("\n");
  const status = Number(chunks.pop() || "0");
  const html = chunks.join("\n");

  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? null;
  const description = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)/i)?.[1] ?? null;
  const headings = extractAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi, html).map(clean).filter(Boolean).slice(0, 50);
  const hrefs = Array.from(new Set(extractAll(/href=["']([^"']+)/gi, html)));
  const internalLinks = hrefs.filter((h) => h.startsWith("/") && !h.startsWith("/_")).sort();
  const externalLinks = hrefs.filter((h) => h.startsWith("http")).sort();

  return { route, status, title, description, headings, internalLinks, externalLinks, fetchedAt: new Date().toISOString() };
}

function main() {
  const rows = seeds.map(crawlRoute);
  writeFileSync("audit/reference-crawl.json", JSON.stringify({ base, rows }, null, 2));
  console.log("Wrote audit/reference-crawl.json");
}

main();
