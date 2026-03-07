import { currentPatch, items, lastUpdated, runes, spells } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Gegenstände, Runen, Beschwörerzauber", "Kompletter Wild-Rift Katalog mit Tabs, Filtern, Buildpfaden und Patch-Marker.", "/items");

const filters = ["Physisch", "Magisch", "Leben", "Mana", "Rüstung", "Magieresistenz", "Gold"] as const;

export default async function ItemsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const tab = String(params.tab ?? "items");
  const filter = String(params.filter ?? "ALL");
  const q = String(params.q ?? "").toLowerCase();

  const itemData = items.filter((i) => (filter === "ALL" || i.category === filter) && (i.name.toLowerCase().includes(q) || i.slug.includes(q)));

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-card p-4">
        <h1 className="text-3xl font-black">Gegenstände / Runen / Beschwörerzauber</h1>
        <p className="mt-1 text-sm text-slate-300">Patch {currentPatch} · Zuletzt aktualisiert: {lastUpdated}</p>
        <form className="mt-3 grid gap-2 md:grid-cols-8">
          <select name="tab" defaultValue={tab} className="rounded bg-white/10 p-2 text-sm md:col-span-2"><option value="items">Items</option><option value="runes">Runen</option><option value="spells">Beschwörerzauber</option></select>
          <input name="q" defaultValue={q} placeholder="Suche" className="rounded bg-white/10 p-2 text-sm md:col-span-3" />
          <select name="filter" defaultValue={filter} className="rounded bg-white/10 p-2 text-sm md:col-span-3"><option value="ALL">Alle Filter</option>{filters.map((f) => <option key={f} value={f}>{f}</option>)}</select>
        </form>
      </div>

      {tab === "items" && (
        <div className="space-y-4">
          <section className="rounded-2xl border border-white/10 bg-card p-4">
            <h2 className="font-semibold">Gegenstände ({itemData.length})</h2>
            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              {itemData.map((item) => (
                <article key={item.slug} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-xs text-slate-300">{item.category} · {item.cost} Gold</p>
                    </div>
                    <div className="flex gap-1 text-[10px]">{item.tags.map((t) => <span key={t} className="rounded bg-emerald-500/20 px-1.5 py-0.5">{t}</span>)}</div>
                  </div>
                  <div className="mt-2 text-xs text-slate-200">{item.stats.join(" · ")}</div>
                  <p className="mt-1 text-xs text-slate-300"><strong>Passiv:</strong> {item.passive}</p>
                  {item.active ? <p className="mt-1 text-xs text-slate-300"><strong>Aktiv:</strong> {item.active}</p> : null}
                  <div className="mt-2 grid gap-1 text-[11px] md:grid-cols-2">
                    <div className="rounded bg-black/25 p-2"><strong>Baut aus:</strong> {item.buildsFrom.join(", ") || "—"}</div>
                    <div className="rounded bg-black/25 p-2"><strong>Baut in:</strong> {item.buildsInto.join(", ") || "—"}</div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

      {tab === "runes" && (
        <section className="rounded-2xl border border-white/10 bg-card p-4">
          <h2 className="font-semibold">Runen ({runes.length})</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {runes.map((r) => (
              <article key={r.slug} className="rounded bg-white/5 p-3 text-sm">
                <h3 className="font-semibold">{r.name}</h3>
                <p className="text-xs text-slate-300">{r.tree} · {r.type}</p>
                <p className="mt-1 text-xs">{r.description}</p>
                <p className="mt-1 text-[11px] text-slate-400">Beliebt auf: {r.champions.slice(0, 3).join(", ")}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "spells" && (
        <section className="rounded-2xl border border-white/10 bg-card p-4">
          <h2 className="font-semibold">Beschwörerzauber ({spells.length})</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {spells.map((s) => (
              <article key={s.slug} className="rounded bg-white/5 p-3 text-sm">
                <h3 className="font-semibold">{s.name}</h3>
                <p className="text-xs text-slate-300">Cooldown: {s.cooldown}</p>
                <p className="mt-1 text-xs">{s.description}</p>
                <p className="mt-1 text-[11px] text-slate-400">Einsatz: {s.useCase}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
