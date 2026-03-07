import Link from "next/link";
import { notFound } from "next/navigation";
import { abilitySet, currentPatch, getChampionBySlug, getGuideLoadout, getMatchups, relatedChampions, roleLabel, skillProgression } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const champion = getChampionBySlug(slug);
  if (!champion) return {};
  return buildMetadata(`${champion.name} Guide ${currentPatch} – Build, Runen, Matchups`, `${champion.name} Wild-Rift Guide mit Buildpfaden, Skillreihenfolge, Matchups, Runen und Statistiken.`, `/guide/${slug}`);
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
            <p className="text-xs uppercase tracking-[0.2em] text-accent2">Champion-Guide · Patch {champion.patch}</p>
            <h1 className="text-4xl font-black">{champion.name}</h1>
            <p className="text-sm text-slate-200">{champion.title}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              {champion.lanes.map((lane) => <span key={lane} className="rounded bg-white/15 px-2 py-1">{roleLabel(lane)}</span>)}
              <span className="rounded bg-accent/40 px-2 py-1">Tier {champion.tier}</span>
              <span className="rounded bg-white/15 px-2 py-1">Meta-Rang #{champion.rankPosition}</span>
            </div>
          </div>
          <div className="rounded-xl bg-black/25 p-3 text-xs text-slate-200">
            <div>Autor: RiftKompass Redaktion</div>
            <div>Zuletzt aktualisiert: {champion.updatedAt}</div>
            <div>Datenstand: {currentPatch}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-5 text-sm">
          <div className="rounded bg-black/20 p-2">Siegquote <strong>{champion.winrate}%</strong></div>
          <div className="rounded bg-black/20 p-2">Pickrate <strong>{champion.pickrate}%</strong></div>
          <div className="rounded bg-black/20 p-2">Bannrate <strong>{champion.banrate}%</strong></div>
          <div className="rounded bg-black/20 p-2">Rangposition <strong>#{champion.rankPosition}</strong></div>
          <div className="rounded bg-black/20 p-2">Tier <strong>{champion.tier}</strong></div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-card p-4">
          <h2 className="font-semibold">Stark gegen</h2>
          <div className="mt-2 space-y-1 text-sm">{matchups.strong.map((c) => <Link className="block rounded bg-white/5 p-2" key={c.slug} href={`/guide/${c.slug}`}>{c.name} · {c.winrate}% WR</Link>)}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-4">
          <h2 className="font-semibold">Schwach gegen</h2>
          <div className="mt-2 space-y-1 text-sm">{matchups.weak.map((c) => <Link className="block rounded bg-white/5 p-2" key={c.slug} href={`/guide/${c.slug}`}>{c.name} · BR {c.banrate}%</Link>)}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-4">
          <h2 className="font-semibold">Synergien</h2>
          <div className="mt-2 space-y-1 text-sm">{matchups.synergy.map((c) => <Link className="block rounded bg-white/5 p-2" key={c.slug} href={`/guide/${c.slug}`}>{c.name} · {roleLabel(c.role)}</Link>)}</div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-card p-4">
          <h2 className="font-semibold">Item-Build</h2>
          <div className="mt-3 grid gap-3 text-sm">
            <div><h3 className="text-xs uppercase text-slate-300">Startitems</h3><div className="mt-1 flex flex-wrap gap-1">{loadout.starter.map((i) => <Link key={i.slug} href="/items" className="rounded bg-white/10 px-2 py-1">{i.name}</Link>)}</div></div>
            <div><h3 className="text-xs uppercase text-slate-300">Boots + Enchant</h3><div className="mt-1 flex flex-wrap gap-1">{loadout.boots.map((i) => <Link key={i.slug} href="/items" className="rounded bg-white/10 px-2 py-1">{i.name}</Link>)}</div></div>
            <div><h3 className="text-xs uppercase text-slate-300">Kernitems</h3><div className="mt-1 flex flex-wrap gap-1">{loadout.core.map((i) => <Link key={i.slug} href="/items" className="rounded bg-white/10 px-2 py-1">{i.name}</Link>)}</div></div>
            <div><h3 className="text-xs uppercase text-slate-300">Final Build</h3><div className="mt-1 flex flex-wrap gap-1">{loadout.finalBuild.map((i) => <Link key={i.slug} href="/items" className="rounded bg-white/10 px-2 py-1">{i.name}</Link>)}</div></div>
            <div><h3 className="text-xs uppercase text-slate-300">Situativ</h3><div className="mt-1 flex flex-wrap gap-1">{loadout.situational.map((i) => <Link key={i.slug} href="/items" className="rounded bg-white/10 px-2 py-1">{i.name}</Link>)}</div></div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-card p-4">
          <h2 className="font-semibold">Runen & Beschwörerzauber</h2>
          <h3 className="mt-3 text-xs uppercase text-slate-300">Runenseite</h3>
          <div className="mt-1 flex flex-wrap gap-1 text-sm">{loadout.runes.map((r) => <Link key={r.slug} href="/items" className="rounded bg-white/10 px-2 py-1">{r.name}</Link>)}</div>
          <h3 className="mt-3 text-xs uppercase text-slate-300">Beschwörerzauber</h3>
          <div className="mt-1 flex flex-wrap gap-1 text-sm">{loadout.spells.map((s) => <Link key={s.slug} href="/items" className="rounded bg-white/10 px-2 py-1">{s.name}</Link>)}</div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-card p-4">
        <h2 className="font-semibold">Skill-Priorität & Level-Progression (1–15)</h2>
        <p className="text-sm text-slate-300">Priorität: Q {">"} W {">"} E, Ultimate auf 5/9/13.</p>
        <div className="mt-3 grid grid-cols-5 gap-1 text-xs sm:grid-cols-10 md:grid-cols-15">
          {progression.map((s, i) => <div key={`${s}-${i}`} className="rounded bg-white/10 p-2 text-center">{i + 1}<div className="font-semibold">{s}</div></div>)}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-card p-4">
        <h2 className="font-semibold">Fähigkeiten</h2>
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
        <h2 className="font-semibold">Guide-Abschnitt</h2>
        <div className="mt-2 grid gap-2 text-sm md:grid-cols-2">
          <p className="rounded bg-white/5 p-2"><strong>Spielstil:</strong> Nutze Spike-Fenster für Mid-Game-Rotation und priorisiere Objective-Setup.</p>
          <p className="rounded bg-white/5 p-2"><strong>Early:</strong> Wave-Management, sichere Trades und Jungle-Priorität herstellen.</p>
          <p className="rounded bg-white/5 p-2"><strong>Mid:</strong> Vision + Side-Lane-Druck für sichere Rotationen.</p>
          <p className="rounded bg-white/5 p-2"><strong>Late:</strong> Positionierung vor Teamfights, Cooldown-Fenster diszipliniert nutzen.</p>
          <p className="rounded bg-white/5 p-2"><strong>Combos:</strong> Öffne mit Utility, folge mit Kernfähigkeit und Ultimate auf Carry-Ziel.</p>
          <p className="rounded bg-white/5 p-2"><strong>Teamfights:</strong> Front-to-Back spielen, aber Flankfenster über Vision absichern.</p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-card p-4">
        <h2 className="font-semibold">Ähnliche Champions</h2>
        <div className="mt-2 grid gap-2 md:grid-cols-4">
          {similar.map((c) => <Link key={c.slug} href={`/guide/${c.slug}`} className="rounded bg-white/5 p-2 text-sm">{c.name} · Tier {c.tier}</Link>)}
        </div>
      </section>
    </div>
  );
}
