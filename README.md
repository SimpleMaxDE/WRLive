# RiftKompass – Deutsche Wild-Rift-Plattform

Eigenständige, deutschsprachige Plattform mit nahezu identischer Informationsarchitektur zur öffentlichen Referenz (ohne Asset-/Text-/Code-Übernahme).

## Kernmodule
- `/` Startseite
- `/guides` Champion-Guides
- `/guide/[slug]` Champion-Detailseiten
- `/items` Gegenstände / Runen / Beschwörerzauber
- `/tier-list` Tier List
- `/ranking` Rangliste
- SEO-Landingpages: `/champions`, `/patch/[patch]`, `/roles/*` (+ `/rollen/*` Alias)

## Audit-Artefakte
- `REFERENCE_AUDIT.md`
- `DATA_SOURCE_AUDIT.md`
- `UX_PARITY_CHECKLIST.md`
- `CONTENT_MODEL.md`
- `routes-map.json`
- `page-types.json`
- `ui-patterns.json`
- `field-inventory.json`
- `ranking-source-contract.json`
- `tierlist-source-contract.json`
- `guide-source-contract.json`
- `catalog-source-contract.json`

## Referenz-Crawl & Extraktion
```bash
npm install
npm run audit:reference
```

## Setup
```bash
cp .env.example .env
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

## Tests
```bash
npm run typecheck
npm run test
npm run build
npm run test:e2e
```
