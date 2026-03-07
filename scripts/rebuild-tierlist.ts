import { champions } from "@/lib/data";

function rebuildTierlist() {
  const grouped = champions.reduce<Record<string, string[]>>((acc, champion) => {
    acc[champion.tier] ||= [];
    acc[champion.tier].push(champion.name);
    return acc;
  }, {});

  console.log("Tierlist rebuilt", grouped);
}

rebuildTierlist();
