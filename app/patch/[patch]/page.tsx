import { champions } from "@/lib/data";

export default async function PatchPage({ params }: { params: Promise<{ patch: string }> }) {
  const { patch } = await params;
  const entries = champions.filter((c) => c.patch.toLowerCase() === patch.toLowerCase());
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Patch {patch.toUpperCase()}</h1>
      <p className="text-slate-300">Changes (new/rework/buff/nerf) are generated from the diff pipeline.</p>
      <div className="grid gap-2 md:grid-cols-2">{entries.map((e) => <div key={e.slug} className="card">{e.name}: {(e.tags ?? []).join(", ") || "No changes"}</div>)}</div>
    </div>
  );
}
