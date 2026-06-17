# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Blog cover images now expose their natural pixel dimensions, read from the
  file at build time (`getImageSize` in `src/lib/blog.ts`), so posts render the
  full image at its real aspect ratio.

### Changed

- **Home page** rewritten as a pure composition: each landing section was
  extracted into its own component under `(home)/_components/`
  (`why-section`, `player-graph-section`, `social-feedback-section`,
  `game-score-section`, `cta-section`, `section-title`). `page.tsx` went from
  211 to 22 lines with no change in rendered output.
- **Roadmap** data extracted from the page into a dedicated declarative module
  (`(home)/roadmap/roadmap-data.tsx`); `roadmap/page.tsx` now holds only the
  presentation (273 → 119 lines).
- **Roadmap** categories are no longer collapsible — they always render open.
  Sub-categories (items) remain collapsible, and the "Expand all" button now
  targets only those items.
- **Hero "Why?" section**: the "Studio side" and "Community side" columns are
  vertically aligned, their headings and list items stay on a single line, the
  text columns were widened (and the image column narrowed) so nothing overflows
  under the image.
- Intro paragraphs of the "Why?" and "Player Graph" sections are now
  left-aligned and span the full width of their container.
- Replaced all em dashes (`—`) across the app (components, content, CSS,
  `.env.example`) with appropriate punctuation (commas, colons, parentheses).
- List bullets in the "Why?" section use a hyphen (`-`) instead of an em dash.

### Fixed

- Blog post cover image was cropped by a forced `16/9` aspect ratio with
  `object-cover`; it now displays uncropped at its natural ratio.

### Removed

- Removed the decorative rotated diamond (golden border, dark background) that
  sat behind the hero content.

## Project history

> Baseline imported from git history before this changelog was introduced.

### playermap-web (this repository)

- **2026-06-16** — Replace generated OG image with custom static AGENT image
  (`19ea682`).
- **2026-06-16** — Initial commit: `playermap-web`, a Next.js + Fumadocs site
  rebuild (`bc757e2`).

### playermap.box (predecessor — Docusaurus site)

> `playermap-web` is a Next.js + Fumadocs rebuild of `playermap.box`
> (`Agent-Gaming/playermap.box`). The history below summarizes the linked
> predecessor project (version numbers track the embedded `player-map`
> dependency).

- **2026-06-10** — Roadmap update.
- **2026-05-20** — `player-map` 2.0.31.
- **2026-05-15** — Add Discord connect, supported chains, and Buffer
  polyfills; `player-map` 2.0.28.
- **2026-04-13** — Game selector configuration.
- **2026-04-01** — Migrate to the new architecture; `player-map` 2.0.x line.
- **2026-03-30** — Front page update.
- **2026-03-18** — Update Player Map and Agent information.
- **2026-03-04** — Wallet chain connect.
- **2026-02-20** — Add Agent roadmap.
- **2026-02-12 → 02-17** — `player-map` 2.0.3 / 2.0.4.
- **2026-01-15** — Improve `wallet.context` and bump `player-map`.
- **2025-12-22** — Update feedback list.
- **2025-12-18** — Add new Player Map constants.
- **2025-11-14** — Mainnet migration guides for Player Map.
- **2025-11-03** — `player-map` 1.0.18.
- **2025-10-30** — Integrate the `test-player-map` demo into Docusaurus
  (dev proxy, static build) and the GitHub Pages deploy workflow.
- **2025-10-28** — Add the "Intuition Marathon" blog post.
- **2025-10-27** — First commit: Docusaurus site with GitHub Actions CI.
