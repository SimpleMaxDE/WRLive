import Link from "next/link";
import { notFound } from "next/navigation";
import { abilitySet, currentPatch, getChampionBySlug, getGuideLoadout, getMatchups, relatedChampions, roleLabel, skillProgression } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const champion = getChampionBySlug(slug);
  if (!champion) return {};
  return buildMetadata(`${champion.name} Guide ${currentPatch} – Build, Runes, Matchups`, `${champion.name} Wild Rift guide with build paths, skill order, matchups, runes, and stats.`, `/guide/${slug}`);
}

export default async function ChampionGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const championData = getChampionBySlug(slug);
  if (!championData) notFound();
  const champion = championData;

  const loadout = getGuideLoadout(champion);
  const matchups = getMatchups(champion);
  const abilities = abilitySet(champion);
  const progression = skillProgression();
  const similar = relatedChampions(champion, 8);

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#16233b] to-[#1a2d4d] p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent2">Champion Guide · Patch {champion.patch}</p>
            <h1 className="text-4xl font-black">{champion.name}</h1>
            <p className="text-sm text-slate-200">{champion.title}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              {champion.lanes.map((lane) => <span key={lane} className="rounded bg-white/15 px-2 py-1">{roleLabel(lane)}</span>)}
              <span className="rounded bg-accent/40 px-2 py-1">Tier {champion.tier}</span>
              <span className="rounded bg-white/15 px-2 py-1">Meta Rank #{champion.rankPosition}</span>
            </div>
          </div>
          <div className="rounded-xl bg-black/25 p-3 text-xs text-slate-200">
            <div>Author: WildLegends Editorial Team</div>
            <div>Last updated: {champion.updatedAt}</div>
            <div>Data patch: {currentPatch}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-5 text-sm">
          <div className="rounded bg-black/20 p-2">Win Rate <strong>{champion.winrate}%</strong></div>
          <div className="rounded bg-black/20 p-2">Pick Rate <strong>{champion.pickrate}%</strong></div>
          <div className="rounded bg-black/20 p-2">Ban Rate <strong>{champion.banrate}%</strong></div>
          <div className="rounded bg-black/20 p-2">Rank Position <strong>#{champion.rankPosition}</strong></div>
          <div className="rounded bg-black/20 p-2">Tier <strong>{champion.tier}</strong></div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-card p-4">
          <h2 className="font-semibold">Strong Against</h2>
          <div className="mt-2 space-y-1 text-sm">{matchups.strong.map((c) => <Link className="block rounded bg-white/5 p-2" key={c.slug} href={`/guide/${c.slug}`}>{c.name} · {c.winrate}% WR</Link>)}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-4">
          <h2 className="font-semibold">Weak Against</h2>
          <div className="mt-2 space-y-1 text-sm">{matchups.weak.map((c) => <Link className="block rounded bg-white/5 p-2" key={c.slug} href={`/guide/${c.slug}`}>{c.name} · BR {c.banrate}%</Link>)}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-4">
          <h2 className="font-semibold">Synergies</h2>
          <div className="mt-2 space-y-1 text-sm">{matchups.synergy.map((c) => <Link className="block rounded bg-white/5 p-2" key={c.slug} href={`/guide/${c.slug}`}>{c.name} · {roleLabel(c.role)}</Link>)}</div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-card p-4">
          <h2 className="font-semibold">Item Build</h2>
          <div className="mt-3 grid gap-3 text-sm">
            <div><h3 className="text-xs uppercase text-slate-300">Starting Items</h3><div className="mt-1 flex flex-wrap gap-1">{loadout.starter.map((i) => <Link key={i.slug} href="/items" className="rounded bg-white/10 px-2 py-1">{i.name}</Link>)}</div></div>
            <div><h3 className="text-xs uppercase text-slate-300">Boots + Enchant</h3><div className="mt-1 flex flex-wrap gap-1">{loadout.boots.map((i) => <Link key={i.slug} href="/items" className="rounded bg-white/10 px-2 py-1">{i.name}</Link>)}</div></div>
            <div><h3 className="text-xs uppercase text-slate-300">Core Items</h3><div className="mt-1 flex flex-wrap gap-1">{loadout.core.map((i) => <Link key={i.slug} href="/items" className="rounded bg-white/10 px-2 py-1">{i.name}</Link>)}</div></div>
            <div><h3 className="text-xs uppercase text-slate-300">Final Build</h3><div className="mt-1 flex flex-wrap gap-1">{loadout.finalBuild.map((i) => <Link key={i.slug} href="/items" className="rounded bg-white/10 px-2 py-1">{i.name}</Link>)}</div></div>
            <div><h3 className="text-xs uppercase text-slate-300">Situational</h3><div className="mt-1 flex flex-wrap gap-1">{loadout.situational.map((i) => <Link key={i.slug} href="/items" className="rounded bg-white/10 px-2 py-1">{i.name}</Link>)}</div></div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-card p-4">
          <h2 className="font-semibold">Runes & Summoner Spells</h2>
          <h3 className="mt-3 text-xs uppercase text-slate-300">Rune Setup</h3>
          <div className="mt-1 flex flex-wrap gap-1 text-sm">{loadout.runes.map((r) => <Link key={r.slug} href="/items" className="rounded bg-white/10 px-2 py-1">{r.name}</Link>)}</div>
          <h3 className="mt-3 text-xs uppercase text-slate-300">Summoner Spells</h3>
          <div className="mt-1 flex flex-wrap gap-1 text-sm">{loadout.spells.map((s) => <Link key={s.slug} href="/items" className="rounded bg-white/10 px-2 py-1">{s.name}</Link>)}</div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-card p-4">
        <h2 className="font-semibold">Skill Priority & Level Progression (1–15)</h2>
        <p className="text-sm text-slate-300">Priority: Q {">"} W {">"} E, upgrade Ultimate at 5/9/13.</p>
        <div className="mt-3 grid grid-cols-5 gap-1 text-xs sm:grid-cols-10 md:grid-cols-15">
          {progression.map((s, i) => <div key={`${s}-${i}`} className="rounded bg-white/10 p-2 text-center">{i + 1}<div className="font-semibold">{s}</div></div>)}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-card p-4">
        <h2 className="font-semibold">Abilities</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {abilities.map((a) => (
            <div key={a.key} className="rounded bg-white/5 p-3">
              <div className="text-sm font-semibold">{a.key} · {a.name}</div>
              <p className="text-xs text-slate-300">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-card p-4">
        <h2 className="font-semibold">Guide Notes</h2>
        <div className="mt-2 grid gap-2 text-sm md:grid-cols-2">
          <p className="rounded bg-white/5 p-2"><strong>Playstyle:</strong> Use power-spike windows for mid-game rotations and prioritize objective setup.</p>
          <p className="rounded bg-white/5 p-2"><strong>Early:</strong> Manage waves, take safe trades, and secure jungle priority.</p>
          <p className="rounded bg-white/5 p-2"><strong>Mid:</strong> Use vision and side-lane pressure for safe rotations.</p>
          <p className="rounded bg-white/5 p-2"><strong>Late:</strong> Position before teamfights and use cooldown windows with discipline.</p>
          <p className="rounded bg-white/5 p-2"><strong>Combos:</strong> Open with utility, follow with core ability and use ultimate on carry targets.</p>
          <p className="rounded bg-white/5 p-2"><strong>Teamfights:</strong> Play front-to-back while controlling flank windows with vision.</p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-card p-4">
        <h2 className="font-semibold">Similar Champions</h2>
        <div className="mt-2 grid gap-2 md:grid-cols-4">
          {similar.map((c) => <Link key={c.slug} href={`/guide/${c.slug}`} className="rounded bg-white/5 p-2 text-sm">{c.name} · Tier {c.tier}</Link>)}
        </div>
      </section>
    </div>
  );
}
