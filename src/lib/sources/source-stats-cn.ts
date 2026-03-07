import { z } from "zod";

export const statsInputSchema = z.array(z.object({
  champion: z.string(),
  role: z.string(),
  patch: z.string(),
  winrate: z.number(),
  pickrate: z.number(),
  banrate: z.number(),
  sourceUpdatedAt: z.string()
}));

export type StatsNormalized = {
  championSlug: string;
  role: string;
  patch: string;
  winrate: number;
  pickrate: number;
  banrate: number;
  presence: number;
  updateTimestamp: string;
  sourceLabel: "inferred" | "unknown" | "public";
};

export function normalizeStats(raw: unknown): StatsNormalized[] {
  const parsed = statsInputSchema.parse(raw);
  return parsed.map((r) => ({
    championSlug: r.champion.toLowerCase().replace(/\s+/g, "-"),
    role: r.role,
    patch: r.patch,
    winrate: r.winrate,
    pickrate: r.pickrate,
    banrate: r.banrate,
    presence: Number((r.pickrate + r.banrate).toFixed(2)),
    updateTimestamp: r.sourceUpdatedAt,
    sourceLabel: "inferred"
  }));
}

export function detectStatsDiff(previous: StatsNormalized[], next: StatsNormalized[]) {
  const prevMap = new Map(previous.map((x) => [`${x.championSlug}-${x.role}`, x]));
  return next.map((n) => {
    const prev = prevMap.get(`${n.championSlug}-${n.role}`);
    if (!prev) return { key: `${n.championSlug}-${n.role}`, change: "new" as const };
    const delta = n.winrate - prev.winrate;
    if (Math.abs(delta) < 0.4) return { key: `${n.championSlug}-${n.role}`, change: "neutral" as const };
    return { key: `${n.championSlug}-${n.role}`, change: delta > 0 ? "buff" as const : "nerf" as const };
  });
}
