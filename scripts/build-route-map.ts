import { readFileSync, writeFileSync } from "node:fs";

const crawl = JSON.parse(readFileSync("audit/reference-crawl.json", "utf8"));
const rows = crawl.rows as Array<any>;

const discoveredRoutes = Array.from(
  new Set(rows.flatMap((r) => [r.route, ...r.internalLinks]).filter((r: string) => r.startsWith("/")))
).sort();

const classify = (route: string) => {
  if (route === "/") return "home";
  if (route === "/guias") return "guides-index";
  if (route.startsWith("/guia/")) return "guide-detail";
  if (route === "/itens") return "catalog";
  if (route === "/tier-list") return "tier-list";
  if (route === "/ranking") return "ranking";
  if (route.startsWith("/champion/")) return "ranking-champion-detail";
  return "other";
};

const routesMap = discoveredRoutes.map((route) => ({ route, pageType: classify(route) }));
const pageTypes = Object.entries(
  routesMap.reduce<Record<string, number>>((acc, row) => {
    acc[row.pageType] = (acc[row.pageType] ?? 0) + 1;
    return acc;
  }, {})
).map(([pageType, count]) => ({ pageType, count }));

writeFileSync("routes-map.json", JSON.stringify(routesMap, null, 2));
writeFileSync("page-types.json", JSON.stringify(pageTypes, null, 2));
console.log("Wrote routes-map.json & page-types.json");
