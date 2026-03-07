import { writeFileSync } from "node:fs";

const fieldInventory = {
  home: ["hero-headline", "cta-guides", "cta-items", "cta-tier-list", "cta-ranking", "patch-highlight", "popular-champions", "latest-updates"],
  guidesIndex: ["champion-card", "name", "patch", "guide-status", "tier-badge", "search", "role-filter", "sort"],
  guideDetail: ["champion-name", "patch", "role", "tier", "winrate", "pickrate", "banrate", "counter-strong", "counter-weak", "build", "runes", "summoner-spells", "skill-order", "abilities", "change-history"],
  catalog: ["tabs-items-runes-spells", "search", "category-filter", "item-cost", "item-stats", "item-passive", "patch-tags"],
  tierList: ["patch", "role-tabs", "tiers-s-a-b-c", "champion-card", "guide-link", "update-timestamp"],
  ranking: ["elo-filter", "role-filter", "patch-filter", "rank", "champion", "winrate", "pickrate", "banrate", "presence", "guide-link"]
};

const uiPatterns = {
  recurringCards: ["champion-grid-card", "stat-pill", "tier-row", "ranking-row", "meta-badge"],
  recurringControls: ["tab-switch", "dropdown-filter", "search-input", "chip-badges"],
  recurringLinks: ["guide-to-catalog", "tier-to-guide", "ranking-to-guide", "global-header-links"]
};

const rankingContract = {
  source_visibility: "unknown/inferred",
  source_classification: "inferred",
  metrics_visible: ["winrate", "pickrate", "banrate", "presence", "rank"],
  filters_visible: ["elo", "role", "patch"],
  sorting_visible: ["winrate", "presence", "banrate", "pickrate"],
  update_hint: "visible updated timestamps",
  confidence: "medium"
};

const tierlistContract = {
  patch_visible: true,
  role_tabs_visible: true,
  tiers_visible: ["S", "A", "B", "C"],
  labels_visible: ["meta/top-pick style badges"],
  guide_linking_visible: true,
  update_logic: "patch-based + editorial/meta weighting inferred",
  split: { statistical: ["patch context", "performance trend"], editorial: ["tier placement narrative"] }
};

const guideContract = {
  fields: {
    identity: ["championname", "patch", "rolle/lane", "tier"],
    stats: ["winrate", "pickrate", "banrate", "ranking-position"],
    matchup: ["starke-gegner", "schwache-gegner"],
    build: ["startitem", "boots", "core-items", "final-build", "situational-items"],
    gameplay: ["summoner-spells", "skill-order", "fähigkeiten", "guide-text"],
    meta: ["autor", "updated-at"]
  },
  segmentation: {
    stats_driven: ["winrate", "pickrate", "banrate", "ranking-position", "matchup-score"],
    static_game_data: ["abilities", "item base data", "rune descriptions", "spell cooldowns"],
    editorial: ["playstyle", "early-mid-late", "combos", "lane/teamfight tips"]
  }
};

const catalogContract = {
  tabs: ["items", "runes", "summoner-spells"],
  filters: ["search", "item-attribute-filters", "rune-tree-filter"],
  categories: ["physisch", "magisch", "defensiv", "support", "boots", "basis", "zwischenitems"],
  status_markers: ["neu", "rework", "buff", "nerf"],
  detail_fields: ["cost", "stats", "passive/active", "build path", "built from", "builds into", "recommended champions", "patch history"]
};

writeFileSync("field-inventory.json", JSON.stringify(fieldInventory, null, 2));
writeFileSync("ui-patterns.json", JSON.stringify(uiPatterns, null, 2));
writeFileSync("ranking-source-contract.json", JSON.stringify(rankingContract, null, 2));
writeFileSync("tierlist-source-contract.json", JSON.stringify(tierlistContract, null, 2));
writeFileSync("guide-source-contract.json", JSON.stringify(guideContract, null, 2));
writeFileSync("catalog-source-contract.json", JSON.stringify(catalogContract, null, 2));
console.log("Wrote field + ui + source contracts");
