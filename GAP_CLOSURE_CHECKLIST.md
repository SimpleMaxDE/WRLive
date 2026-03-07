# GAP_CLOSURE_CHECKLIST

| Bereich | Status vorher | Status nachher | Was ergänzt wurde | Was fehlt noch |
|---|---|---|---|---|
| Startseite | MVP-Landing mit wenig Tiefe | Plattformartige, dichte Startseite | Große Hero-Zone, Modul-Einstiege, Patch/Update-Panel, Popular-Champions, Highlights, Recent Guides | Redaktionelle News-Feed-Automation |
| /guides | Kleine Demo-Grid-Wirkung | Vollabdeckung + dichte Rasterdarstellung | Alle Champions, Suche, Rollen-/Patch-/Guide-Filter, Sortierung, Badge-Karten | Persistente URL-Facets für Mehrfachfilter |
| /guide/[slug] | Schmale Datenseite | Voller Guide-Aufbau | Hero, Stat-Block, Autor/Update, Strong/Weak/Synergy, Buildblöcke, Runen/Spells, Skill-Grid 1–15, Fähigkeiten, ähnliche Champions | Echte Matchup-Kennzahlen aus Live-Source |
| /items | Mockup-artig | Vollerer Katalogfluss | Tabs Items/Runen/Spells, Filtermatrix, Detailkarten mit Kosten/Stats/Passiv/Aktiv/Buildpfad, Patchtags | Vollständige Live-Itemliste aus API-Pipeline |
| /tier-list | Einfache Liste | Meta-Seite mit Patch/Rolle/Tiers | Rollenfilter, S/A/B/C-Container, Marker, Guidelinks, Update-Hinweis | Dynamische Tierberechnung pro Elo |
| /ranking | Einfache Tabelle | Dichte Ranking-Ansicht | Quelle, Update-Stamp, Elo/Role/Sort-Filter, positionsstarke Tabelle, Guidelinks | Historische Trendansicht |
| Datenvollständigkeit | 5 Champions + Mini-Katalog | Vollständige Champion-Abdeckung + großer Katalog | 140+ Champions, erweiterte Items/Runen/Spells, konsistente Patch/Update-Felder | Automatisierte tägliche Vollsynchronisation |
| Design-Parität | Generisch Gaming-MVP | Dichtes Plattform-Layout | Höhere Informationsdichte, stärkere Sektionstrennung, detailliertere Datablöcke, kompakte Karten | Feinabstimmung Typografie/Spacing im letzten Pixel |

## Datenvollständigkeit je Hauptseite
- `/`: vollständig für Portal-Überblick (Guides, Tier, Ranking, Highlights, Updates).
- `/guides`: volle Championliste + Filter/Sortierung.
- `/guide/[slug]`: alle Kernmodule strukturell vorhanden.
- `/items`: Items/Runes/Spells mit Filter- und Detailstruktur.
- `/tier-list`: patch- und rollenbasierte Tierdarstellung.
- `/ranking`: rank- und sortierbare Stats-Tabelle mit Attribution.

## Design-Parität je Hauptseite
- `/`: **hoch**
- `/guides`: **hoch**
- `/guide/[slug]`: **hoch**
- `/items`: **mittel-hoch**
- `/tier-list`: **hoch**
- `/ranking`: **hoch**

## Referenzähnlichkeit je Hauptseite
- `/`: **hoch (eigene CI, ähnliche IA)**
- `/guides`: **hoch**
- `/guide/[slug]`: **hoch**
- `/items`: **mittel-hoch**
- `/tier-list`: **hoch**
- `/ranking`: **hoch**
