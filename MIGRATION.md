# Why this rebuild — Docusaurus → Next.js + Fumadocs

This document explains the rationale behind the `playermap-web` rebuild for the
owners taking it over: what changed, why, and where to deploy it.

## What this project is (and is not)

This is a from-scratch rebuild of the **website front-end** of `playermap.box`.
It covers the **site only**: landing page, blog, roadmap, installation docs and
legal pages. It does **not** touch the graph application, the `player-map`
library, or any back-end — the "Launch app" button simply links out to the
existing graph app (`NEXT_PUBLIC_APP_URL`). No secrets are required to run it.

The **visual identity is preserved**: the gold accent (`#ffd32a`) and the
dark-first look are intentionally unchanged.

## What it was before

The previous site was a **Docusaurus** project, built to static HTML and served
on **GitHub Pages**. Docusaurus did its job as a docs site, but the project had
grown beyond "just docs": a marketing landing page, a blog, a roadmap, legal
pages — all of which are awkward to build inside a docs-first framework.

## Why Fumadocs instead of Docusaurus

The key decision was to keep MDX-based authoring (like Docusaurus) but move to a
documentation framework that is built **on top of Next.js** rather than being a
separate framework.

- **One app, not two worlds.** Fumadocs runs inside a normal Next.js (App
  Router) application. So the landing, blog, roadmap, legal pages **and** the
  docs are a single codebase, with full freedom of React 19 and Tailwind v4 for
  the custom pages. With Docusaurus, anything beyond docs (the animated hero,
  the roadmap tabs, custom layouts) fights the framework's conventions.
- **Access to the Next.js ecosystem.** Native image optimization
  (`next/image`, AVIF), on-the-fly **Open Graph image generation** (`next/og`),
  metadata API (canonical, sitemap, robots, `llms.txt`), incremental rendering,
  and first-class hosting on Vercel — none of which Docusaurus gives you.
- **Modern, mainstream stack.** Next.js 16, React 19, Tailwind v4, MDX. Easy to
  hire for and maintain, one dependency tree, one build, one deploy target.
- **Cheap content migration.** Docusaurus and Fumadocs both author in MDX, so
  the existing docs were migrated with minimal rewriting (frontmatter +
  `meta.json` ordering instead of `_category_.json`).

In short: Docusaurus is a great docs framework; this project needed a **website**
that also has docs. Fumadocs-on-Next.js fits that shape.

## What changed vs. the old site

Feature parity, plus upgrades — all while keeping the identity:

- **Docs**: fully migrated to Fumadocs/MDX, with sidebar ordering, search and
  per-page Open Graph images.
- **Landing / roadmap / blog / legal / open-source**: rebuilt as first-class
  pages (video hero, roadmap tabs, paginated blog with share + OG, etc.).
- **Search** (`Ctrl/⌘ K`) kept.
- **Single locked dark theme** (the theme switch was intentionally removed).
- **SEO/social**: `sitemap.xml`, `robots.txt`, `llms.txt`, canonical URLs, and
  Open Graph / Twitter cards on every page.
- **Theming polish**: theme-aware favicons and a PWA web manifest.
- **Performance**: raster images served via `next/image` (AVIF), lazy reveals,
  reduced-motion support.

## Hosting — where to deploy

**GitHub Pages no longer applies.** Pages only serves static files; this app
needs a **Node runtime** (the `/api/search` route and the on-the-fly Open Graph
image generation are server-side). GitHub stays useful as the **source repo** —
only the host changes.

Recommended path (and the one chosen for the preview):

- **Host: Vercel** — the first-party Next.js platform. Connect the GitHub repo
  and it builds and deploys on every push, with zero config and per-PR preview
  deployments. Open Graph, search and image optimization work out of the box.
- **DNS: Cloudflare** (the domain lives there) pointing at Vercel, with the
  record set to **"DNS only" (grey cloud)** so Vercel terminates TLS.
- **Self-hosted alternative**: any Docker host (e.g. Coolify) using
  `output: 'standalone'` — full ownership at the cost of operating it.

The whole domain configuration is a **single environment variable**
(`NEXT_PUBLIC_SITE_URL`) — there are no hardcoded site URLs to find-and-replace.
See **`HANDOVER.md`** for the exact deployment steps, the domain-switch
mechanism, and the post-deploy verification checklist.
