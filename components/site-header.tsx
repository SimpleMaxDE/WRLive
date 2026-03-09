import Link from "next/link";

const nav = [
  ["Home", "/"],
  ["Guides", "/guides"],
  ["Items", "/items"],
  ["Tier List", "/tier-list"],
  ["Ranking", "/ranking"]
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d7a34a]/30 bg-[#090f1de8] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="bg-gradient-to-r from-[#ffd98a] to-[#d7a34a] bg-clip-text text-2xl font-black tracking-tight text-transparent">WildLegends Hub</Link>
        <nav className="hidden gap-1 md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-white/10 hover:text-white">{label}</Link>
          ))}
        </nav>
        <div className="ml-auto hidden md:block">
          <input className="w-72 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm placeholder:text-slate-400" placeholder="Search champion, item, rune..." />
        </div>
      </div>
    </header>
  );
}
