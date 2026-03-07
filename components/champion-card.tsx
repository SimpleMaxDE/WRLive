import Link from "next/link";
import { roleLabel } from "@/lib/data";
import { Champion } from "@/lib/types";

export function ChampionCard({ champion }: { champion: Champion }) {
  return (
    <Link href={`/guide/${champion.slug}`} className="group rounded-2xl border border-white/10 bg-gradient-to-b from-[#14233a] to-[#101a2e] p-3 hover:border-accent/70">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold tracking-wide group-hover:text-accent2">{champion.name}</h3>
        <span className="rounded bg-accent/30 px-2 py-0.5 text-[10px]">T{champion.tier}</span>
      </div>
      <p className="text-[11px] text-slate-300">{champion.title}</p>
      <div className="mt-2 flex flex-wrap gap-1 text-[10px]">
        <span className="rounded bg-white/10 px-1.5 py-0.5">{roleLabel(champion.role)}</span>
        <span className="rounded bg-white/10 px-1.5 py-0.5">Patch {champion.patch}</span>
        {champion.tags.slice(0, 1).map((tag) => <span key={tag} className="rounded bg-emerald-500/20 px-1.5 py-0.5">{tag}</span>)}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px] text-slate-300">
        <span>WR {champion.winrate}%</span>
        <span>PR {champion.pickrate}%</span>
        <span>BR {champion.banrate}%</span>
        <span>#{champion.rankPosition}</span>
      </div>
    </Link>
  );
}
