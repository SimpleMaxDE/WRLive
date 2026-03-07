import Link from "next/link";
import { champions } from "@/lib/data";
import { Role } from "@/lib/types";

export default async function RolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  const roleMap: Record<string, Role> = { baron: "BARON", jungle: "JUNGLE", mid: "MID", dragon: "DRAGON", support: "SUPPORT" };
  const roleEnum = roleMap[role] ?? "MID";
  const list = champions.filter((c) => c.role === roleEnum);
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Rolle: {role}</h1>
      <div className="grid gap-2 md:grid-cols-3">{list.map((c) => <Link key={c.slug} href={`/guide/${c.slug}`} className="card">{c.name}</Link>)}</div>
    </div>
  );
}
