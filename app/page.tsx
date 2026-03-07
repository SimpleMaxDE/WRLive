import Link from "next/link";
import { champions, currentPatch, lastUpdated, roleLabel } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("RiftKompass – Wild Rift Plattform auf Deutsch", "Patchbasierte Wild-Rift-Guides, Builds, Tier List, Rangliste und Katalogdaten mit hoher Informationsdichte.", "/");

export default function HomePage() {
  const popular = [...champions].sort((a, b) => b.popularity - a.popularity).slice(0, 12);
  const updates = [...champions].slice(0, 8);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#141b33] via-[#1a2442] to-[#192840] p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent2">Patch {currentPatch} · Wild Rift Deutschland</p>
            <h1 className="mt-2 text-3xl font-black leading-tight md:text-5xl">Meta, Builds und Champion-Guides auf Plattform-Niveau</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">RiftKompass bündelt Champion-Guides, Katalogdaten, Tier-Analysen und Rankings in einer klaren, dichten Informationsarchitektur mit täglichen Update-Läufen.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/guides" className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold">Champion-Guides</Link>
              <Link href="/items" className="rounded-lg border border-white/20 px-4 py-2 text-sm">Gegenstände</Link>
              <Link href="/tier-list" className="rounded-lg border border-white/20 px-4 py-2 text-sm">Tier List</Link>
              <Link href="/ranking" className="rounded-lg border border-white/20 px-4 py-2 text-sm">Rangliste</Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <h2 className="text-sm font-semibold">Aktueller Status</h2>
            <div className="mt-3 grid gap-2 text-xs text-slate-300">
              <div className="rounded bg-white/10 p-2">Patch: {currentPatch}</div>
              <div className="rounded bg-white/10 p-2">Zuletzt aktualisiert: {lastUpdated}</div>
              <div className="rounded bg-white/10 p-2">Abgedeckte Champions: {champions.length}</div>
              <div className="rounded bg-white/10 p-2">Guide-Abdeckung: 100%</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Champion-Guides", "/guides", "Vollständiges Champion-Raster mit Filtern"],
          ["Gegenstände & Runen", "/items", "Kategorien, Tags und Build-Pfade"],
          ["Tier List", "/tier-list", "Patch + Rollen + Tiergruppen"],
          ["Rangliste", "/ranking", "Winrate, Presence, Banrate, Pickrate"]
        ].map(([label, href, desc]) => (
          <Link key={href} href={href} className="rounded-2xl border border-white/10 bg-card p-4 hover:border-accent/60">
            <h3 className="font-semibold">{label}</h3>
            <p className="mt-1 text-xs text-slate-300">{desc}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-card p-4">
          <h2 className="text-lg font-semibold">Beliebte Champions im aktuellen Patch</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((c) => (
              <Link key={c.slug} href={`/guide/${c.slug}`} className="rounded-lg bg-white/5 p-2 text-xs hover:bg-white/10">
                <div className="flex items-center justify-between"><span className="font-semibold">{c.name}</span><span>T{c.tier}</span></div>
                <div className="text-slate-300">{roleLabel(c.role)} · WR {c.winrate}% · PR {c.pickrate}%</div>
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-4">
          <h2 className="text-lg font-semibold">Patch-Highlights</h2>
          <ul className="mt-3 space-y-2 text-xs text-slate-300">
            <li className="rounded bg-white/5 p-2">Neue Prioritätspicks im Jungle und Mid.</li>
            <li className="rounded bg-white/5 p-2">Tank-Itemisierung stabilisiert Frontline-Meta.</li>
            <li className="rounded bg-white/5 p-2">Dragon-Lane bleibt stark pickrate-getrieben.</li>
            <li className="rounded bg-white/5 p-2">Support-Enchants gewinnen an Match-Impact.</li>
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-card p-4">
        <h2 className="text-lg font-semibold">Zuletzt aktualisierte Guides</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-4">
          {updates.map((c) => (
            <Link key={c.slug} href={`/guide/${c.slug}`} className="rounded bg-white/5 p-2 text-xs">
              <div className="font-semibold">{c.name}</div>
              <div className="text-slate-300">Patch {c.patch} · {c.updatedAt}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
