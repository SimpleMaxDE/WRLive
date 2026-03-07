import { NextRequest, NextResponse } from "next/server";
import { champions, items, runes } from "@/lib/data";

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").toLowerCase();
  const result = {
    champions: champions.filter((c) => c.name.toLowerCase().includes(q)),
    items: items.filter((i) => i.name.toLowerCase().includes(q)),
    runes: runes.filter((r) => r.name.toLowerCase().includes(q))
  };
  return NextResponse.json(result);
}
