import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-[#d7a34a]/20 bg-black/20">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 text-sm text-slate-300 md:grid-cols-3 md:px-6">
        <div>
          <h3 className="mb-2 font-semibold text-white">WildLegends Hub</h3>
          <p>Wild Rift platform in English with guides, tier data, and rank-based insights.</p>
        </div>
        <div className="space-y-1">
          <Link href="/impressum">Legal Notice</Link><br />
          <Link href="/datenschutz">Privacy Policy</Link>
        </div>
        <div>Data updates run automatically via the pipeline.</div>
      </div>
    </footer>
  );
}
