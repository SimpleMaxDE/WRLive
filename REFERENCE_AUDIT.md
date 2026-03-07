# REFERENCE_AUDIT – wildlegends.net (öffentlich sichtbar)

## Methodik
- Nur öffentlich erreichbare Seiten (`/`, `/guias`, `/itens`, `/tier-list`, `/ranking`, Beispiel-Guide) wurden gecrawlt.
- Keine Login-/Private-API-Umgehung.
- Keine Asset-/Code-Übernahme.

## Navigation (sichtbar)
- Home (`/`)
- Guides (`/guias`)
- Items (`/itens`)
- Tier List (`/tier-list`)
- Ranking (`/ranking`)
- Externer Turnierbereich (separate Domain)

## Routenfamilien
- Home: `/`
- Guide Index: `/guias`
- Guide Detail: `/guia/[Champion]`
- Items/Catalog: `/itens`
- Tier List: `/tier-list`
- Ranking: `/ranking`
- Ranking Champion Detail (sichtbar verlinkt): `/champion/[slug]`

## Seitentypen + Komponenten
1. Home
   - Hero + CTA
   - Schnellzugriff auf Kernmodule
   - Patch- und Update-Hinweise
   - Beliebte Champions
2. Guides Index
   - Championkarten-Grid
   - Suche/Filter/Sortierkontrollen
3. Guide Detail
   - Header (Champion, Patch, Rolle, Tier)
   - Build-Sektion
   - Runen
   - Beschwörerzauber
   - Skill-Reihenfolge
   - Counter stark/schwach
   - Change-History
4. Items
   - Katalogansicht mit Tab-Logik (Items/Runes/Spells-artig)
5. Tier List
   - Patch-Kontext
   - Rollenumschaltung
   - Tier-Buckets (S/A/B/C)
6. Ranking
   - Tabellen-/Listenansicht
   - Metriken + Filter

## Sichtbare Datenfelder je Typ
Siehe `field-inventory.json`.

## Sichtbare Update-Mechaniken
- Patch-Hinweise in mehreren Modulen sichtbar.
- Historie-Elemente auf Guide-Ebene sichtbar.
- „Zuletzt aktualisiert“-Hinweise indirekt sichtbar.

## Interne Verlinkung
- Header verbindet Kernmodule.
- Tier List und Ranking verlinken zu Champions/Guides.
- Guide-Detail verlinkt in Katalogkontext.

## Quellenhinweise
- Öffentlich sichtbar ist die Darstellung der Daten, aber nicht immer die konkrete Backend-Quelle.
- Daher wurden Quelleinstufungen strikt als `public`, `inferred`, `unknown`, `manual/editorial` getrennt.
