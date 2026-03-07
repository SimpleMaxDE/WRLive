import { prisma } from "@/lib/prisma";
import { champions } from "@/lib/data";

async function main() {
  const patch = await prisma.patch.upsert({
    where: { version: "7.0C" },
    update: {},
    create: { version: "7.0C", releasedAt: new Date("2026-03-01") }
  });

  for (const champ of champions) {
    const champion = await prisma.champion.upsert({
      where: { slug: champ.slug },
      update: { name: champ.name, title: champ.title, currentPatchId: patch.id, overview: `${champ.name} Guide auf Deutsch.`, iconUrl: `/icons/${champ.slug}.png`, heroImageUrl: `/heroes/${champ.slug}.jpg` },
      create: { slug: champ.slug, name: champ.name, title: champ.title, currentPatchId: patch.id, overview: `${champ.name} Guide auf Deutsch.`, iconUrl: `/icons/${champ.slug}.png`, heroImageUrl: `/heroes/${champ.slug}.jpg` }
    });

    await prisma.championRole.upsert({
      where: { championId_role: { championId: champion.id, role: champ.role } },
      update: { primary: true },
      create: { championId: champion.id, role: champ.role, primary: true }
    });
  }

  await prisma.source.upsert({
    where: { key: "official-patch-notes" },
    update: {},
    create: { key: "official-patch-notes", name: "Riot Patch Notes", url: "https://wildrift.leagueoflegends.com", type: "official" }
  });
}

main().finally(async () => prisma.$disconnect());
