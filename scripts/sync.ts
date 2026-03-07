import { runPipeline, SourceAdapter } from "@/lib/pipeline";

const sourceAdapter: SourceAdapter = {
  key: "wildrift-reference-adapter",
  fetchRaw: async () => [
    { slug: "ahri", name: "Ahri", role: "MID", patch: "7.0C" },
    { slug: "aatrox", name: "Aatrox", role: "BARON", patch: "7.0C" }
  ],
  normalize: async (raw) => {
    const arr = Array.isArray(raw) ? raw : [raw];
    return arr.map((entry: any) => ({ slug: entry.slug, name: entry.name, role: entry.role, patch: entry.patch }));
  }
};

async function main() {
  const job = process.argv[2] ?? "patch";
  const result = await runPipeline(sourceAdapter);
  console.log(`[${job}]`, result);
}

main();
