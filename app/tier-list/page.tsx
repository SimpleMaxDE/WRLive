import Link from "next/link";
import { champions, currentPatch, lastUpdated, roleLabel } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { Role } from "@/lib/types";

export const metadata = buildMetadata("Wild Rift Tier List", "Patch-based tier list with role filters, WR/PR/BR metrics, and direct guide links.", "/tier-list");

const roles: Role[] = ["BARON", "JUNGLE", "MID", "DRAGON", "SUPPORT"];

const tierMeta = {
  S: { label: "OP / Must Pick", color: "from-[#e4b04f] to-[#c8832f]" },
  A: { label: "Meta Strong", color: "from-[#9a7cff] to-[#6f57d9]" },
  B: { label: "Solid", color: "from-[#4fa4d8] to-[#2f7daa]" },
  C: { label: "Niche", color: "from-[#6e7485] to-[#4a4f5f]" }
} as const;

export default async function TierListPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const role = String(params.role ?? "BARON") as Role;

  const byRole = champions.filter((c) => c.role === role);
  const tiers = ["S", "A", "B", "C"] as const;

  return (
    <div className="space-y-5">
      <section className="panel overflow-hidden border-[#d7a34a]/40 bg-gradient-to-r from-[#121a30] via-[#161f36] to-[#0f1b30]">
        <h1 className="text-3xl font-black md:text-4xl">Wild Rift Tier List</h1>
        <p className="mt-2 text-sm text-slate-200">Patch {currentPatch} • Role {roleLabel(role)} • Last update {lastUpdated}</p>
        <form className="mt-4 flex flex-wrap gap-2">
          {roles.map((r) => (
            <button key={r} name="role" value={r} className={`rounded-md border px-3 py-1.5 text-sm font-medium ${r === role ? "border-[#f0c36f] bg-[#f0c36f]/20 text-white" : "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"}`}>{roleLabel(r)}</button>
          ))}
        </form>
      </section>

      {tiers.map((tier) => (
        <section key={tier} className="panel border-white/10">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="flex items-center gap-3 text-lg font-bold">
              <span className={`inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br text-sm font-black ${tierMeta[tier].color}`}>{tier}</span>
              Tier {tier}
            </h2>
            <span className="text-xs text-slate-300">{tierMeta[tier].label}</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {byRole.filter((c) => c.tier === tier).slice(0, 24).map((c) => (
              <Link key={c.slug} href={`/guide/${c.slug}`} className="rounded-lg border border-white/10 bg-[#0d1528] p-3 text-sm hover:border-[#d7a34a]/60 hover:bg-[#111b32]">
                <div className="flex items-center justify-between"><span className="font-semibold">{c.name}</span><span className="text-xs text-[#f0c36f]">#{c.rankPosition}</span></div>
                <div className="mt-1 text-xs text-slate-300">WR {c.winrate}% • PR {c.pickrate}% • BR {c.banrate}%</div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
