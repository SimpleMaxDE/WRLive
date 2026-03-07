import { describe, expect, it } from "vitest";
import { runPipeline } from "@/lib/pipeline";

describe("pipeline", () => {
  it("validiert normalisierte Champion-Daten", async () => {
    const result = await runPipeline({
      key: "test",
      fetchRaw: async () => [{ slug: "ahri", name: "Ahri", role: "MID", patch: "7.0C" }],
      normalize: async (raw) => raw as any[]
    });

    expect(result.valid).toBe(1);
    expect(result.invalid).toBe(0);
  });
});
