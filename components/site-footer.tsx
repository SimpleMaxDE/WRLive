import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 text-sm text-slate-400 md:grid-cols-3">
        <div>
          <h3 className="mb-2 font-semibold text-white">RiftKompass</h3>
          <p>Deutsche Wild-Rift-Plattform mit Guides, Meta-Analysen und Patchdaten.</p>
        </div>
        <div className="space-y-1">
          <Link href="/impressum">Impressum</Link><br />
          <Link href="/datenschutz">Datenschutz</Link>
        </div>
        <div>Letzte Datenaktualisierung: automatisch via Pipeline.</div>
      </div>
    </footer>
  );
}
