import Link from "next/link";

const nav = [
  ["Start", "/"],
  ["Guides", "/guides"],
  ["Items", "/items"],
  ["Tier List", "/tier-list"],
  ["Ranking", "/ranking"]
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link href="/" className="text-2xl font-black tracking-tight text-accent2">RiftKompass</Link>
        <nav className="hidden gap-2 md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="rounded px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white">{label}</Link>
          ))}
        </nav>
        <div className="ml-auto hidden md:block">
          <input className="w-72 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" placeholder="Champion, Item oder Rune suchen" />
        </div>
      </div>
    </header>
  );
}
