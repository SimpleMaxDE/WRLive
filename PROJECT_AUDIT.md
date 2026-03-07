# PROJECT_AUDIT

## 1) Funktionale Referenzanalyse (wildlegends.net)
Basierend auf öffentlich auslesbaren Seitenrouten und HTML/SSR-Hydration wurden folgende Module erkannt:
- Hauptnavigation: `/`, `/guias`, `/itens`, `/tier-list`, `/ranking`, plus Turnier-Link `torneio.wildlegends.net`.
- Champion-Guides als Detailrouten unter `/guia/[Champion]`.
- Ranking mit Champion-Detaillinks unter `/champion/[slug]`.
- Guide-Seite zeigt u. a. Build, Runen, Beschwörerzauber, Skill-Reihenfolge, Counter (stark/schwach), Patch- und Änderungsverlauf.
- Meta-/SEO-Felder auf Guide-Seiten enthalten Patch und Rollenbezug.

## 2) Nachgebaut in unserem Produkt
- Vollständige IA mit deutschen Routen:
  - `/`, `/guides`, `/guide/[slug]`, `/items`, `/tier-list`, `/ranking`
  - SEO-Landingpages: `/champions`, `/rollen/[role]`, `/patch/[patch]`
- Starke interne Verlinkung zwischen Guides, Tier List, Ranking und Items.
- Champion-Detailseite mit Statistikboxen, Build-/Runen-/Spell-Segmenten, Skill-Order, Matchup-/Synergiebereich.
- Tierlist- und Rankingmodule inkl. Patch-/Filterkonzept.
- Vorbereiteter Pipeline-Stack (ingest, normalize, validation, publish).

## 3) Absichtliche Unterschiede (Eigenständigkeit)
- Eigenes Branding: **RiftKompass**.
- Eigenes Designsystem (Farben, Komponenten, Kartenstil, Navigation).
- Deutsche Terminologie und eigene Content-Struktur.
- Keine Übernahme von Logos, Texten, Bildassets, CSS, JS oder Markennamen der Referenz.

## 4) Identifizierte öffentliche Datenquellen (für Adapter)
- Offizielle Riot-Wild-Rift-Patchnotes (Patch-Zeitpunkt / Changes).
- Community-/Statistikportale als optionale Rankingquellen (nur aggregiert, per Adapter abstrahiert).
- Offizielle Champion-/Item-/Rune-Definitionen als semantische Basis.

## 5) Unklare Datenquellen / TODO
- Exakte Berechnungslogik der externen Tier-Rankings (Gewichtung je Elo/Rolle) unklar.
- Detaillierte Matchup-Metriken je Lane müssen je Quelle normalisiert werden.
- Patch-Diff-Tagging (neu/rework/buff/nerf) braucht source-spezifische Parser-Regeln.

## 6) Vermiedene Copycat-Risiken
- Kein Code-/Asset-Reuse der Referenzseite.
- Eigene deutsche Slugs und Seitenstrukturbezeichnungen.
- Eigene UI-Komponenten statt visuellem Clone.
- Datenarchitektur vollständig neu modelliert.
