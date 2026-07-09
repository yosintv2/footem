# League Pages Implementation Plan

## 1. Update `src/config.ts`
Replace nav menu items with 6 league routes:
```
{ key: '/ucl', label: 'UCL' },
{ key: '/premier-league', label: 'Premier League' },
{ key: '/laliga', label: 'LaLiga' },
{ key: '/serie-a', label: 'Serie A' },
{ key: '/ligue-1', label: 'Ligue 1' },
{ key: '/mls', label: 'MLS' },
```

## 2. Create `src/layouts/PageBody.astro`
Shared template extracting the duplicated content from `index.astro` and `football.astro`:
- Frontmatter imports: MatchList, Sidebar, LatestNews, WhatsAppPopup, config
- Takes no props (just renders the full homepage body)
- Contains:
  - `.site-content` div with MatchList + Sidebar + LatestNews + WhatsAppPopup
  - `#footem-player` div with YoSinTV player (identical to current)
  - Player CSS and inline script

## 3. Update `src/pages/index.astro`
Simplify to just:
```astro
---
import Layout from '../layouts/Layout.astro';
import PageBody from '../layouts/PageBody.astro';
import { config } from '../config';
---
<Layout title={`${config.site.name} - ${config.site.tagline}`}>
  <PageBody />
</Layout>
```

## 4. Update `src/pages/football.astro`
Same as index.astro — just wraps `<PageBody />` in Layout.

## 5. Create 6 new pages
Each in `src/pages/`:
- `ucl.astro`
- `premier-league.astro`
- `laliga.astro`
- `serie-a.astro`
- `ligue-1.astro`
- `mls.astro`

Each identical to index.astro (Layout + PageBody).

## 6. Build & verify
- `npx astro build` — all pages compile
- All pages show MatchList with full league filters
- All pages support `?src=` player mode
- Nav menu shows the 6 league links
