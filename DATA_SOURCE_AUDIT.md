# DATA_SOURCE_AUDIT

## Grundsatz
Nur öffentlich belegbare Hinweise werden als Fakt dokumentiert. Alles andere ist als `inferred` oder `unknown` markiert.

## 1) Ranking
- Sichtbar: Kennzahlen wie Siegquote/Pickrate/Bannrate/Presence + Rang.
- Sichtbar: Filter nach Rolle/Elo/Patch (UX-seitig).
- Quelle: `inferred` (konkreter Anbieter öffentlich nicht eindeutig belegbar).
- Contract: `ranking-source-contract.json`.

## 2) Tier List
- Sichtbar: Patchbezug, Rollenfilter, Tiergruppen S/A/B/C, Guide-Verlinkung.
- Teil statistisch (Meta-Kontext), Teil redaktionell (Tier-Einordnung): `inferred`.
- Contract: `tierlist-source-contract.json`.

## 3) Champion-Guides
- Sichtbar: Identität + Patch + Rolle + Tier, Build/Runen/Spells/Skills/Counter.
- Statistik-Felder separat von redaktionellen Texten trennbar.
- Contract: `guide-source-contract.json`.

## 4) Items/Runen/Spells
- Sichtbar: Katalogstruktur, Kategorien, Marker (neu/buff/nerf/rework), Detaildaten.
- Quelle teils statisch/spieldatengetrieben, teils patch-/diff-getrieben.
- Contract: `catalog-source-contract.json`.

## Adapter-Zuordnung
- `source_stats_cn` → statistische Meta-Daten (`inferred`).
- `source_static_game_data` → statische Spielobjekte (`public`).
- `source_editorial_guides` → redaktionelle Inhalte (`manual/editorial`).
