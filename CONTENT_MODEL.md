# CONTENT_MODEL

## Domänen
1. **Stats Domain**
   - Champion performance je Patch/Rolle/Elo
   - Felder: winrate, pickrate, banrate, presence, rankPosition
2. **Static Game Data Domain**
   - Champions, Fähigkeiten, Items, Runen, Spells
3. **Editorial Domain**
   - Guide-Texte, Tipps, Strategy-Abschnitte, Autorinfo

## Zusammenführung (Publish-Layer)
- Guide-Seite = Stats + Static + Editorial
- Tier List = Stats Aggregation + Editorial Weighting
- Ranking = Stats-first, optional editorial hints
- Items = Static + Patch-Diff Tags

## Diff-Logik
- `new`: nicht im Vorpatch vorhanden
- `buff/nerf`: numerische positive/negative delta
- `rework`: strukturelle Änderung in Fähigkeiten/Guide-Segmenten

## Source-Labels
- `public`: klar öffentlich belegbar
- `inferred`: plausibel, aber nicht explizit benannt
- `unknown`: derzeit nicht belegbar
- `manual/editorial`: redaktionell intern gepflegt
