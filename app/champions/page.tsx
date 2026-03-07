import Link from "next/link";
import { champions } from "@/lib/data";

export default function ChampionsLandingPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Alle Champions</h1>
      <div className="grid gap-2 md:grid-cols-4">
        {champions.map((c) => <Link className="card" key={c.slug} href={`/guide/${c.slug}`}>{c.name}</Link>)}
      </div>
    </div>
  );
}
