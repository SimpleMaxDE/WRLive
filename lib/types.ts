export type Role = "BARON" | "JUNGLE" | "MID" | "DRAGON" | "SUPPORT";
export type Tier = "S" | "A" | "B" | "C";

export type Champion = {
  slug: string;
  name: string;
  title: string;
  role: Role;
  lanes: Role[];
  tier: Tier;
  patch: string;
  winrate: number;
  pickrate: number;
  banrate: number;
  popularity: number;
  rankPosition: number;
  updatedAt: string;
  guideAvailable: boolean;
  tags: string[];
};

export type ItemEntry = {
  slug: string;
  name: string;
  category: "Physisch" | "Magisch" | "Leben" | "Mana" | "Rüstung" | "Magieresistenz" | "Gold";
  cost: number;
  stats: string[];
  passive: string;
  active?: string;
  buildsFrom: string[];
  buildsInto: string[];
  tags: string[];
  patch: string;
};

export type RuneEntry = {
  slug: string;
  name: string;
  tree: "Präzision" | "Dominanz" | "Entschlossenheit" | "Inspiration";
  type: "Keystone" | "Primär" | "Sekundär";
  description: string;
  champions: string[];
};

export type SpellEntry = {
  slug: string;
  name: string;
  cooldown: string;
  description: string;
  useCase: string;
};
