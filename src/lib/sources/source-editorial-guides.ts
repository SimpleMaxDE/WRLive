import { z } from "zod";

export const editorialInputSchema = z.array(z.object({
  championSlug: z.string(),
  patch: z.string(),
  role: z.string(),
  author: z.string().optional(),
  playstyle: z.string(),
  early: z.string(),
  mid: z.string(),
  late: z.string(),
  combos: z.string(),
  tips: z.string()
}));

export type EditorialGuideOutput = {
  championSlug: string;
  patch: string;
  role: string;
  guideText: {
    playstyle: string;
    early: string;
    mid: string;
    late: string;
    combos: string;
    tips: string;
  };
  sourceLabel: "manual/editorial";
  updateTimestamp: string;
};

export function normalizeEditorialGuides(raw: unknown): EditorialGuideOutput[] {
  const parsed = editorialInputSchema.parse(raw);
  return parsed.map((p) => ({
    championSlug: p.championSlug,
    patch: p.patch,
    role: p.role,
    guideText: {
      playstyle: p.playstyle,
      early: p.early,
      mid: p.mid,
      late: p.late,
      combos: p.combos,
      tips: p.tips
    },
    sourceLabel: "manual/editorial",
    updateTimestamp: new Date().toISOString()
  }));
}

export function detectEditorialDiff(previous: EditorialGuideOutput[], next: EditorialGuideOutput[]) {
  const prevBySlug = new Map(previous.map((p) => [p.championSlug, p]));
  return next.map((n) => {
    const prev = prevBySlug.get(n.championSlug);
    if (!prev) return { championSlug: n.championSlug, change: "new" as const };
    const changed = JSON.stringify(prev.guideText) !== JSON.stringify(n.guideText);
    return { championSlug: n.championSlug, change: changed ? "rework" as const : "stable" as const };
  });
}
