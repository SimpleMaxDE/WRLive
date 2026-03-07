import { z } from "zod";

export const staticGameInputSchema = z.object({
  patch: z.string(),
  champions: z.array(z.object({ slug: z.string(), name: z.string(), abilities: z.array(z.string()) })),
  items: z.array(z.object({ slug: z.string(), name: z.string(), stats: z.array(z.string()) })),
  runes: z.array(z.object({ slug: z.string(), name: z.string(), tree: z.string() })),
  spells: z.array(z.object({ slug: z.string(), name: z.string(), cooldown: z.string() }))
});

export type StaticCatalogOutput = z.infer<typeof staticGameInputSchema> & {
  updateTimestamp: string;
  sourceLabel: "public" | "unknown";
};

export function normalizeStaticGameData(raw: unknown): StaticCatalogOutput {
  const parsed = staticGameInputSchema.parse(raw);
  return {
    ...parsed,
    updateTimestamp: new Date().toISOString(),
    sourceLabel: "public"
  };
}

export function detectStaticDiff(previous: StaticCatalogOutput, next: StaticCatalogOutput) {
  const prevItems = new Set(previous.items.map((i) => i.slug));
  return next.items.map((item) => ({
    slug: item.slug,
    change: prevItems.has(item.slug) ? "known" : "new"
  }));
}
