import Link from "next/link";
import { champions, currentPatch, lastUpdated, rankingSourceAttribution, roleLabel } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { Role } from "@/lib/types";

export const metadata = buildMetadata("Ranking & Champion Stats", "Dense ranking view with elo filters, role filter, and sorting by WR/PR/BR/Presence.", "/ranking");

const roles: Role[] = ["BARON", "JUNGLE", "MID", "DRAGON", "SUPPORT"];
const eloOptions = ["DIAMOND+", "MASTER+", "CHALLENGER", "LEGENDARY"] as const;

export default async function RankingPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const role = (String(params.role ?? "BARON") as Role);
  const elo = String(params.elo ?? "DIAMOND+");
  const sort = String(params.sort ?? "winrate");

  let data = champions.filter((c) => c.role === role);
  data = [...data].sort((a, b) => {
    if (sort === "presence") return (b.pickrate + b.banrate) - (a.pickrate + a.banrate);
    if (sort === "banrate") return b.banrate - a.banrate;
    if (sort === "pickrate") return b.pickrate - a.pickrate;
    return b.winrate - a.winrate;
  });

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-card p-4">
        <h1 className="text-3xl font-black">Ranking / Stats</h1>
        <p className="text-sm text-slate-300">Patch {currentPatch} · Updated {lastUpdated}</p>
        <p className="mt-1 text-xs text-slate-400">Data source: {rankingSourceAttribution}</p>
        <form className="mt-3 grid gap-2 md:grid-cols-4">
          <select name="elo" defaultValue={elo} className="rounded bg-white/10 p-2 text-sm">{eloOptions.map((e) => <option key={e} value={e}>{e}</option>)}</select>
          <select name="role" defaultValue={role} className="rounded bg-white/10 p-2 text-sm">{roles.map((r) => <option key={r} value={r}>{roleLabel(r)}</option>)}</select>
          <select name="sort" defaultValue={sort} className="rounded bg-white/10 p-2 text-sm"><option value="winrate">Win Rate</option><option value="presence">Presence</option><option value="banrate">Ban Rate</option><option value="pickrate">Pickrate</option></select>
          <button className="rounded bg-accent px-3 py-2 text-sm font-semibold">Refresh</button>
        </form>
      </div>

      <section className="rounded-2xl border border-white/10 bg-card p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-slate-300">
                <th className="pb-2">Rank</th><th className="pb-2">Champion</th><th className="pb-2">Role</th><th className="pb-2">Win Rate</th><th className="pb-2">Pickrate</th><th className="pb-2">Ban Rate</th><th className="pb-2">Presence</th><th className="pb-2">Guide</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c, i) => (
                <tr key={c.slug} className="border-b border-white/5">
                  <td className="py-2">{i + 1}</td>
                  <td className="py-2 font-semibold">{c.name}</td>
                  <td className="py-2 text-slate-300">{roleLabel(c.role)}</td>
                  <td className="py-2">{c.winrate}%</td>
                  <td className="py-2">{c.pickrate}%</td>
                  <td className="py-2">{c.banrate}%</td>
                  <td className="py-2">{(c.pickrate + c.banrate).toFixed(1)}%</td>
                  <td className="py-2"><Link href={`/guide/${c.slug}`} className="rounded bg-white/10 px-2 py-1 text-xs">Open Guide</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
