import Link from "next/link";
import { champions } from "@/lib/data";

export default async function RolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  const map: Record<string, string> = { baron: "BARON", jungle: "JUNGLE", mid: "MID", dragon: "DRAGON", support: "SUPPORT" };
  const roleKey = map[role] ?? "MID";
  const list = champions.filter((c) => c.role === roleKey);
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Role: {role}</h1>
      <div className="grid gap-3 md:grid-cols-3">
        {list.map((c) => (
          <Link className="card" key={c.slug} href={`/guide/${c.slug}`}>{c.name}</Link>
        ))}
      </div>
    </div>
  );
}
