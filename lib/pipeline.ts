import { z } from "zod";

export type SourceAdapter = {
  key: string;
  fetchRaw: () => Promise<unknown>;
  normalize: (raw: unknown) => Promise<unknown[]>;
};

const championSchema = z.object({
  slug: z.string(),
  name: z.string(),
  role: z.string(),
  patch: z.string()
});

export async function runPipeline(adapter: SourceAdapter) {
  const raw = await adapter.fetchRaw();
  const normalized = await adapter.normalize(raw);
  const valid = normalized.map((entry) => championSchema.safeParse(entry)).filter((r) => r.success);
  return {
    adapter: adapter.key,
    ingested: Array.isArray(raw) ? raw.length : 1,
    normalized: normalized.length,
    valid: valid.length,
    invalid: normalized.length - valid.length
  };
}
