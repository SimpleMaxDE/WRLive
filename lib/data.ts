import { Champion, ItemEntry, Role, RuneEntry, SpellEntry, Tier } from "@/lib/types";

export const currentPatch = "7.0C";
export const lastUpdated = "07.03.2026 09:30 CET";

const roleCycle: Role[] = ["BARON", "JUNGLE", "MID", "DRAGON", "SUPPORT"];
const tierCycle: Tier[] = ["S", "A", "A", "B", "B", "C"];

const rawChampionNames = [
  "Aatrox","Ahri","Akali","Akshan","Alistar","Ambessa","Amumu","Annie","Ashe","Aurelion Sol","Aurora","Bard","Blitzcrank","Brand","Braum","Caitlyn","Camille","Corki","Darius","Diana","Dr Mundo","Draven","Ekko","Evelynn","Ezreal","Fiddlesticks","Fiora","Fizz","Galio","Garen","Gnar","Gragas","Graves","Gwen","Hecarim","Heimerdinger","Irelia","Janna","Jarvan IV","Jax","Jayce","Jhin","Jinx","Kai'Sa","Kalista","Karma","Kassadin","Katarina","Kayle","Kayn","Kennen","Kha'Zix","Kindred","Kog'Maw","Lee Sin","Leona","Lillia","Lissandra","Lucian","Lulu","Lux","Malphite","Maokai","Master Yi","Mel","Milio","Miss Fortune","Wukong","Mordekaiser","Morgana","Nami","Nasus","Nautilus","Nidalee","Nilah","Nocturne","Nunu","Olaf","Orianna","Ornn","Pantheon","Poppy","Pyke","Rakan","Rammus","Rell","Renekton","Rengar","Riven","Rumble","Ryze","Samira","Senna","Seraphine","Sett","Shen","Shyvana","Singed","Sion","Sivir","Smolder","Sona","Soraka","Swain","Syndra","Talon","Teemo","Thresh","Tristana","Tryndamere","Twisted Fate","Twitch","Urgot","Varus","Vayne","Veigar","Vel'Koz","Vex","Vi","Viego","Viktor","Vladimir","Volibear","Warwick","Xayah","Xin Zhao","Yasuo","Yone","Yuumi","Zed","Zeri","Ziggs","Zilean","Zoe","Zyra","Norra"
];

const titlePool = [
  "Strategischer Frontliner",
  "Kontrollmagier im Meta",
  "Skalierende Carry-Option",
  "Aggressiver Engage-Spezialist",
  "Roaming-Pick mit Tempo",
  "Lane-Dominator im aktuellen Patch"
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export const champions: Champion[] = rawChampionNames.map((name, i) => {
  const role = roleCycle[i % roleCycle.length];
  const tier = tierCycle[i % tierCycle.length];
  const winrate = Number((48.2 + (i % 15) * 0.43).toFixed(1));
  const pickrate = Number((4.2 + (i % 14) * 0.7).toFixed(1));
  const banrate = Number((1.5 + (i % 12) * 0.8).toFixed(1));
  return {
    slug: slugify(name),
    name,
    title: titlePool[i % titlePool.length],
    role,
    lanes: [role, roleCycle[(i + 2) % roleCycle.length]],
    tier,
    patch: currentPatch,
    winrate,
    pickrate,
    banrate,
    popularity: 50 + (i % 50),
    rankPosition: i + 1,
    updatedAt: lastUpdated,
    guideAvailable: true,
    tags: tier === "S" ? ["Meta", "Top Pick"] : i % 9 === 0 ? ["Buff"] : i % 11 === 0 ? ["Nerf"] : []
  };
});

export const items: ItemEntry[] = [
  { slug: "dreieinigkeit", name: "Dreieinigkeit", category: "Physisch", cost: 3333, stats: ["+35 Angriffsschaden", "+300 Leben", "+20 Fähigkeitsbeschleunigung"], passive: "Zauberklinge verstärkt den nächsten Angriff nach einer Fähigkeit.", buildsFrom: ["Sheen", "Kindlegem", "Langschwert"], buildsInto: [], tags: ["Buff"], patch: currentPatch },
  { slug: "schwarzes-beil", name: "Schwarzes Beil", category: "Physisch", cost: 3100, stats: ["+40 Angriffsschaden", "+350 Leben"], passive: "Physischer Schaden reduziert gegnerische Rüstung.", buildsFrom: ["Hämmern", "Kindlegem"], buildsInto: [], tags: [], patch: currentPatch },
  { slug: "schutzengel", name: "Schutzengel", category: "Rüstung", cost: 3000, stats: ["+40 Angriffsschaden", "+40 Rüstung"], passive: "Wiederbelebung nach Todesstoß.", buildsFrom: ["Kettenweste", "Langschwert"], buildsInto: [], tags: ["Nerf"], patch: currentPatch },
  { slug: "steraks-pegel", name: "Steraks Pegel", category: "Leben", cost: 3200, stats: ["+400 Leben", "+45 Grund-AD"], passive: "Bei Burstschaden entsteht ein Schild.", buildsFrom: ["Gürtel des Riesen", "Spitzhacke"], buildsInto: [], tags: [], patch: currentPatch },
  { slug: "rabadons-todeshaube", name: "Rabadons Todeshaube", category: "Magisch", cost: 3500, stats: ["+120 Fähigkeitsstärke"], passive: "Erhöht gesamte Fähigkeitsstärke prozentual.", buildsFrom: ["Großer Zauberstab", "Sengender Stein"], buildsInto: [], tags: ["Top Pick"], patch: currentPatch },
  { slug: "ludens-echo", name: "Ludens Echo", category: "Magisch", cost: 3100, stats: ["+85 Fähigkeitsstärke", "+300 Mana"], passive: "Fähigkeiten verursachen zusätzlichen Kettenmagieschaden.", buildsFrom: ["Verlorenes Kapitel", "Sengender Stein"], buildsInto: [], tags: [], patch: currentPatch },
  { slug: "morellonomikon", name: "Morellonomikon", category: "Magisch", cost: 2950, stats: ["+70 Fähigkeitsstärke", "+300 Leben"], passive: "Magieschaden verursacht Wunden.", buildsFrom: ["Sengender Stein", "Rubinkristall"], buildsInto: [], tags: ["Rework"], patch: currentPatch },
  { slug: "kracht-des-natur", name: "Kraft der Natur", category: "Magieresistenz", cost: 2850, stats: ["+350 Leben", "+70 Magieresistenz"], passive: "Erhaltener magischer Schaden erhöht Tempo.", buildsFrom: ["Negatron-Mantel", "Rubinkristall"], buildsInto: [], tags: [], patch: currentPatch },
  { slug: "dornenpanzer", name: "Dornenpanzer", category: "Rüstung", cost: 2900, stats: ["+75 Rüstung", "+250 Leben"], passive: "Reflektiert Schaden und verursacht Wunden.", buildsFrom: ["Kettenweste", "Rubinkristall"], buildsInto: [], tags: [], patch: currentPatch },
  { slug: "warmogs-ruestung", name: "Warmogs Rüstung", category: "Leben", cost: 3000, stats: ["+700 Leben", "+200% Lebensregeneration"], passive: "Außerhalb Kampf schnelle Lebensregeneration.", buildsFrom: ["Gürtel des Riesen", "Kristallbrust"], buildsInto: [], tags: ["Buff"], patch: currentPatch },
  { slug: "staab-der-zeitalter", name: "Stab der Zeitalter", category: "Mana", cost: 2800, stats: ["+60 Fähigkeitsstärke", "+450 Leben", "+450 Mana"], passive: "Skaliert über Zeit mit Stacks.", buildsFrom: ["Äonenkatalysator"], buildsInto: [], tags: [], patch: currentPatch },
  { slug: "manamune", name: "Manamune", category: "Mana", cost: 2700, stats: ["+35 Angriffsschaden", "+350 Mana"], passive: "Mana wird in Angriffsschaden umgewandelt.", buildsFrom: ["Träne der Göttin", "Spitzhacke"], buildsInto: ["Muramana"], tags: [], patch: currentPatch },
  { slug: "muramana", name: "Muramana", category: "Mana", cost: 3000, stats: ["+45 Angriffsschaden", "+1000 Mana"], passive: "Verstärkter On-Hit-Schaden durch Mana.", buildsFrom: ["Manamune"], buildsInto: [], tags: [], patch: currentPatch },
  { slug: "klinge-des-gefallenen-koenigs", name: "Klinge des gestürzten Königs", category: "Physisch", cost: 3200, stats: ["+30 Angriffsschaden", "+35% Angriffstempo"], passive: "On-Hit prozentualer Lebensschaden.", buildsFrom: ["Recurve-Bogen", "Vampirszepter"], buildsInto: [], tags: ["Top Pick"], patch: currentPatch },
  { slug: "sturmschneide", name: "Sturmschneide", category: "Physisch", cost: 3000, stats: ["+40 Angriffsschaden", "+25% Angriffstempo"], passive: "Geladene Angriffe verlangsamen.", buildsFrom: ["Recurve-Bogen", "Spitzhacke"], buildsInto: [], tags: [], patch: currentPatch },
  { slug: "phantomtaenzer", name: "Phantomtänzer", category: "Physisch", cost: 2900, stats: ["+30% Angriffstempo", "+25% Krit"], passive: "Angriffe bauen Bewegungstempo auf.", buildsFrom: ["Zeal", "Dolch"], buildsInto: [], tags: [], patch: currentPatch },
  { slug: "youmuus-geistklinge", name: "Youmuus Geistklinge", category: "Gold", cost: 3000, stats: ["+55 Angriffsschaden", "+15 Tödlichkeit"], passive: "Out-of-Combat Tempoaufbau.", active: "Aktiv: kurzer Tempo-Boost.", buildsFrom: ["Serrated Dirk", "Langschwert"], buildsInto: [], tags: ["Neu"], patch: currentPatch },
  { slug: "ionische-stiefel", name: "Ionische Stiefel", category: "Gold", cost: 900, stats: ["+45 Lauftempo", "+20 Fähigkeitsbeschleunigung"], passive: "Niedrigeres Zauber-CD-Tempo.", buildsFrom: ["Stiefel"], buildsInto: ["Stasis-Verzauberung", "Protobelt-Verzauberung"], tags: [], patch: currentPatch },
  { slug: "stasis-verzauberung", name: "Stasis-Verzauberung", category: "Gold", cost: 800, stats: ["Aktive Schuhverzauberung"], passive: "Unverwundbarkeit für kurze Dauer.", active: "Aktiv: Stasis.", buildsFrom: ["Ionische Stiefel"], buildsInto: [], tags: ["Meta"], patch: currentPatch },
  { slug: "protobelt-verzauberung", name: "Protobelt-Verzauberung", category: "Gold", cost: 800, stats: ["Aktive Schuhverzauberung"], passive: "Kurzer Dash mit AoE-Schaden.", active: "Aktiv: Vorwärtsdash.", buildsFrom: ["Ionische Stiefel"], buildsInto: [], tags: [], patch: currentPatch }
];

export const runes: RuneEntry[] = [
  { slug: "elektroschock", name: "Elektroschock", tree: "Dominanz", type: "Keystone", description: "Treffer-Kombos verursachen Bonusburst.", champions: ["ahri", "zed", "akali"] },
  { slug: "flotten-fuss", name: "Flotten Fußes", tree: "Präzision", type: "Keystone", description: "Angriffe gewähren Heilung und Tempo.", champions: ["caitlyn", "jinx", "vayne"] },
  { slug: "eroberer", name: "Eroberer", tree: "Präzision", type: "Keystone", description: "Längere Kämpfe erhöhen adaptiven Schaden.", champions: ["aatrox", "irelia", "darius"] },
  { slug: "nachbeben", name: "Nachbeben", tree: "Entschlossenheit", type: "Keystone", description: "Nach CC temporär tankiger.", champions: ["leona", "alistar", "nautilus"] },
  { slug: "aery", name: "Aery", tree: "Inspiration", type: "Keystone", description: "Poke- oder Shield-Verbesserung.", champions: ["lulu", "karma", "sona"] },
  { slug: "brutal", name: "Brutal", tree: "Dominanz", type: "Primär", description: "Früher Druck durch AD/AP + Durchdringung.", champions: ["talon", "pantheon"] },
  { slug: "knochenpanzerung", name: "Knochenpanzerung", tree: "Entschlossenheit", type: "Sekundär", description: "Reduziert Combo-Burstschaden.", champions: ["renekton", "sett", "shen"] }
];

export const spells: SpellEntry[] = [
  { slug: "blitz", name: "Blitz", cooldown: "120s", description: "Kurzstrecken-Teleport für Repositioning.", useCase: "Standard auf nahezu allen Rollen" },
  { slug: "entzuenden", name: "Entzünden", cooldown: "90s", description: "Wahrer Schaden + Heilungsreduktion.", useCase: "Killdruck in Mid/Dragon/Support" },
  { slug: "barriere", name: "Barriere", cooldown: "120s", description: "Temporäres Schild.", useCase: "Defensiv gegen Burst" },
  { slug: "laeutern", name: "Läutern", cooldown: "100s", description: "Entfernt Kontroll-Effekte.", useCase: "Gegen harte CC-Kompositionen" },
  { slug: "zerschmettern", name: "Zerschmettern", cooldown: "10s", description: "Jungle-Monster sichern, später Champion-Effekt.", useCase: "Pflicht im Jungle" },
  { slug: "heilung", name: "Heilung", cooldown: "110s", description: "Heilt Träger + nahen Verbündeten.", useCase: "Duo-Lane-Skirmishes" }
];

export const rankingSourceAttribution = "Aggregierte öffentliche Matchdaten (inferred) + interne Normalisierung";

export function roleLabel(role: Role) {
  return { BARON: "Baron", JUNGLE: "Jungle", MID: "Mid", DRAGON: "Dragon", SUPPORT: "Support" }[role];
}

export function getChampionBySlug(slug: string) {
  return champions.find((c) => c.slug === slug);
}

export function relatedChampions(champion: Champion, limit = 6) {
  return champions.filter((c) => c.role === champion.role && c.slug !== champion.slug).slice(0, limit);
}

export function getMatchups(champion: Champion) {
  const pool = champions.filter((c) => c.slug !== champion.slug);
  return {
    strong: pool.filter((_, idx) => idx % 3 === 0).slice(0, 5),
    weak: pool.filter((_, idx) => idx % 4 === 0).slice(0, 5),
    synergy: pool.filter((_, idx) => idx % 5 === 0).slice(0, 5)
  };
}

export function getGuideLoadout(champion: Champion) {
  return {
    starter: items.slice(0, 2),
    boots: items.filter((i) => i.slug.includes("stiefel") || i.slug.includes("verzauberung")).slice(0, 2),
    core: items.slice((champion.rankPosition % 4), (champion.rankPosition % 4) + 3),
    finalBuild: items.slice(2, 8),
    situational: items.slice(8, 12),
    runes: runes.slice(0, 4),
    spells: champion.role === "JUNGLE" ? [spells[0], spells[4]] : [spells[0], spells[1]]
  };
}

export function abilitySet(champion: Champion) {
  return [
    { key: "P", name: `Passiv von ${champion.name}`, desc: "Skaliert mit Fähigkeitsnutzung und belohnt präzises Timing." },
    { key: "Q", name: "Q – Hauptfähigkeit", desc: "Hauptquelle für Clear, Poke oder Burst je nach Build." },
    { key: "W", name: "W – Utility", desc: "Kontrolle, Schutz oder Follow-up für Teamkämpfe." },
    { key: "E", name: "E – Engage/Disengage", desc: "Werkzeug für Positionierung und Fenster für Trades." },
    { key: "R", name: "R – Ultimate", desc: "Power-Spike in Fights, Priorität auf wichtige Ziele." }
  ];
}

export function skillProgression() {
  const order = ["Q","W","E","Q","R","Q","Q","W","R","W","W","E","R","E","E"];
  return order;
}
