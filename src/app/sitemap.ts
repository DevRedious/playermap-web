import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/shared";
import { source } from "@/lib/source";

// Static pages (route group "(home)"). The paginated /blog/page/[n] pages
// are intentionally omitted: they all point to /blog (canonical).
const STATIC_PATHS = [
	"/",
	"/blog",
	"/roadmap",
	"/open-source",
	"/legal-notice",
	"/privacy-policy",
	"/terms-of-service",
	"/risk-disclosure",
];

export default function sitemap(): MetadataRoute.Sitemap {
	const url = (path: string) => `${siteUrl}${path}`;

	const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
		url: url(path),
		changeFrequency: "monthly",
		priority: path === "/" ? 1 : 0.7,
	}));

	const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
		url: url(`/blog/${post.slug}`),
		lastModified: post.date || undefined,
		changeFrequency: "yearly",
		priority: 0.6,
	}));

	const docsEntries: MetadataRoute.Sitemap = source.getPages().map((page) => ({
		url: url(page.url),
		changeFrequency: "monthly",
		priority: 0.5,
	}));

	return [...staticEntries, ...blogEntries, ...docsEntries];
}
