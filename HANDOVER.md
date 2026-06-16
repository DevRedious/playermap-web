# Handover & deployment — playermap-web

This Next.js site replaces the old static Docusaurus. **GitHub Pages no longer
applies**: the app needs a Node runtime (server search route `/api/search`,
on-the-fly Open Graph image generation). Host it on any platform that runs
Next.js (Vercel, or a self-hosted Docker host such as Coolify).

## The domain is a single switch

Everything that embeds the site's domain — **Open Graph / Twitter images,
`canonical`, `metadataBase`, `sitemap.xml`, `robots.txt`** — derives from one
value:

```ts
// src/lib/shared.ts
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://playermap.box"
```

There is **no site domain hardcoded anywhere else**. To change the domain, set
the env var — **do not** search-and-replace URLs in the code (that would undo
this design).

> ⚠️ `NEXT_PUBLIC_*` variables are **inlined at build time**, not read at
> runtime. Changing the domain therefore requires a **rebuild / redeploy**, not
> just an env edit. On Vercel, updating the variable and redeploying does this
> automatically.

### Environment variables

| Variable | Purpose | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL → OG/social images, canonical, sitemap, robots. | **Set this per deployment.** Defaults to `https://playermap.box`. |
| `NEXT_PUBLIC_APP_URL` | Target of the **"Launch app"** button (the live graph app). | Separate concern — independent of where this site is hosted. |

## Temporary preview deployment (Vercel)

1. Push this repo to GitHub and import it in Vercel (zero config for Next.js).
2. In Vercel → Project → Settings → Environment Variables, set
   `NEXT_PUBLIC_SITE_URL` to the preview domain you control
   (your own domain, or the generated `https://<project>.vercel.app`).
3. (Optional) Add your custom domain in Vercel → Settings → Domains. Vercel then
   shows the exact DNS record to create.
4. Deploy. Open Graph / canonical now resolve to that domain.

### Cloudflare DNS → Vercel (this setup)

The domain's DNS is managed at **Cloudflare**, but the site is **hosted on
Vercel**. After adding the domain in Vercel, create the record Vercel gives you
in the Cloudflare dashboard:

- Subdomain (e.g. `preview.example.com`) → **CNAME** to `cname.vercel-dns.com`.
- Apex (`example.com`) → the A record Vercel provides (Cloudflare flattens it).
- ⚠️ Set the record to **"DNS only" (grey cloud), NOT Proxied (orange cloud)**.
  Let Vercel terminate TLS and serve directly; the Cloudflare proxy in front of
  Vercel causes double-CDN / SSL issues. If you ever must proxy, set Cloudflare
  SSL/TLS mode to **Full (strict)**.

## Handover to the owners (final domain)

1. Transfer the GitHub repo (or let them fork/import it).
2. They host it (Vercel, or their own Docker/Coolify — see note above).
3. Set `NEXT_PUBLIC_SITE_URL` to **their** final domain and redeploy.
4. Point the final domain's DNS at the host.

That's the entire domain migration: **one variable + one redeploy.**

## Post-deploy verification checklist

- [ ] `NEXT_PUBLIC_SITE_URL` set to the intended domain for this deployment.
- [ ] `https://<domain>/sitemap.xml` and `/robots.txt` show the correct domain.
- [ ] OG preview is correct on a debugger (e.g. opengraph.xyz, the Discord/X
      share preview) for `/`, a blog post, and a docs page.
- [ ] Search (Ctrl+K) works (the `/api/search` route is live).
- [ ] Favicons swap with the OS light/dark scheme; PWA manifest loads.
