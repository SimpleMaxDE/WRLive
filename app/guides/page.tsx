import { ChampionCard } from "@/components/champion-card";
import { champions, currentPatch, roleLabel } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { Role } from "@/lib/types";

export const metadata = buildMetadata("Champion-Guides – alle Champions", "Komplette Wild-Rift Champion-Übersicht mit Suche, Rollenfiltern, Patchfilter und Sortierung.", "/guides");

const allRoles: Role[] = ["BARON", "JUNGLE", "MID", "DRAGON", "SUPPORT"];

export default async function GuidesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const q = String(params.q ?? "").toLowerCase();
  const role = String(params.role ?? "ALL");
  const patch = String(params.patch ?? currentPatch);
  const guide = String(params.guide ?? "all");
  const sort = String(params.sort ?? "popular");

  let data = champions.filter((c) => c.name.toLowerCase().includes(q) || c.slug.includes(q));
  if (role !== "ALL") data = data.filter((c) => c.role === role);
  if (patch !== "ALL") data = data.filter((c) => c.patch === patch);
  if (guide === "yes") data = data.filter((c) => c.guideAvailable);

  data = [...data].sort((a, b) => {
    if (sort === "alpha") return a.name.localeCompare(b.name);
    if (sort === "updated") return b.updatedAt.localeCompare(a.updatedAt);
    if (sort === "tier") return a.tier.localeCompare(b.tier);
    return b.popularity - a.popularity;
  });

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-card p-4">
        <h1 className="text-3xl font-black">Champion-Guides</h1>
        <p className="mt-1 text-sm text-slate-300">{data.length} von {champions.length} Champions angezeigt · Patch {currentPatch}</p>
        <form className="mt-3 grid gap-2 md:grid-cols-6">
          <input name="q" defaultValue={q} placeholder="Champion suchen" className="rounded bg-white/10 p-2 text-sm md:col-span-2" />
          <select name="role" defaultValue={role} className="rounded bg-white/10 p-2 text-sm"><option value="ALL">Alle Rollen</option>{allRoles.map((r) => <option key={r} value={r}>{roleLabel(r)}</option>)}</select>
          <select name="patch" defaultValue={patch} className="rounded bg-white/10 p-2 text-sm"><option value={currentPatch}>{currentPatch}</option><option value="ALL">Alle Patches</option></select>
          <select name="guide" defaultValue={guide} className="rounded bg-white/10 p-2 text-sm"><option value="all">Guide verfügbar: alle</option><option value="yes">Nur verfügbar</option></select>
          <select name="sort" defaultValue={sort} className="rounded bg-white/10 p-2 text-sm"><option value="popular">Popularität</option><option value="alpha">Alphabetisch</option><option value="updated">Zuletzt aktualisiert</option><option value="tier">Tier</option></select>
        </form>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
        {data.map((champion) => <ChampionCard key={champion.slug} champion={champion} />)}
      </div>
    </div>
  );
}
