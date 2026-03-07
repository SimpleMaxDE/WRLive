import Link from "next/link";
import { champions, currentPatch, lastUpdated, roleLabel } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { Role } from "@/lib/types";

export const metadata = buildMetadata("Tier List Wild Rift", "Patchbasierte Tier List mit Rollenfiltern, Meta-Badges und Guide-Links.", "/tier-list");

const roles: Role[] = ["BARON", "JUNGLE", "MID", "DRAGON", "SUPPORT"];

export default async function TierListPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const role = (String(params.role ?? "BARON") as Role);

  const byRole = champions.filter((c) => c.role === role);
  const tiers = ["S", "A", "B", "C"] as const;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-card p-4">
        <h1 className="text-3xl font-black">Tier List</h1>
        <p className="text-sm text-slate-300">Patch {currentPatch} · Rolle {roleLabel(role)} · Update {lastUpdated}</p>
        <form className="mt-3 flex flex-wrap gap-2">
          {roles.map((r) => (
            <button key={r} name="role" value={r} className={`rounded px-3 py-1.5 text-sm ${r === role ? "bg-accent" : "bg-white/10"}`}>{roleLabel(r)}</button>
          ))}
        </form>
      </div>

      {tiers.map((tier) => (
        <section key={tier} className="rounded-2xl border border-white/10 bg-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Tier {tier}</h2>
            <span className="text-xs text-slate-400">Meta-Label: {tier === "S" ? "Top Pick" : tier === "A" ? "Stabil" : "Situativ"}</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {byRole.filter((c) => c.tier === tier).slice(0, 24).map((c) => (
              <Link key={c.slug} href={`/guide/${c.slug}`} className="rounded-lg bg-white/5 p-2 text-sm hover:bg-white/10">
                <div className="flex items-center justify-between"><span className="font-semibold">{c.name}</span><span className="text-xs">#{c.rankPosition}</span></div>
                <div className="text-xs text-slate-300">WR {c.winrate}% · PR {c.pickrate}% · Guide ✓</div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
