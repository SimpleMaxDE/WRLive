import { MetadataRoute } from "next";
import { champions } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.riftkompass.de";
  const staticRoutes = ["", "/guides", "/items", "/tier-list", "/ranking", "/champions", "/roles/baron", "/roles/jungle", "/roles/mid", "/roles/dragon", "/roles/support", "/rollen/baron", "/rollen/jungle", "/rollen/mid", "/rollen/dragon", "/rollen/support"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, changeFrequency: "daily" as const, priority: route === "" ? 1 : 0.8 })),
    ...champions.map((champion) => ({ url: `${base}/guide/${champion.slug}`, changeFrequency: "daily" as const, priority: 0.9 }))
  ];
}
