import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { CustomScrollbar } from "@/components/custom-scrollbar";
import { appDescription, appName, siteUrl } from "@/lib/shared";
import "./global.css";

const inter = Inter({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: { default: appName, template: `%s — ${appName}` },
	description: appDescription,
	applicationName: appName,
	// Themed manifest: wired up manually via <link media> (see <head> below),
	// because the Metadata API only takes a single manifest and has no notion of theme.
	alternates: { canonical: "/" },
	// Favicons that adapt to the browser theme (prefers-color-scheme):
	// "light" variant (gold→black) on a light tab bar, "dark" (gold→white)
	// on a dark bar. The SVG is a single file (gradient works on both backgrounds).
	icons: {
		icon: [
			{ url: "/icon.svg", type: "image/svg+xml" },
			{
				url: "/favicon-light.ico",
				sizes: "any",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/favicon-dark.ico",
				sizes: "any",
				media: "(prefers-color-scheme: dark)",
			},
			{
				url: "/favicon-16x16-light.png",
				type: "image/png",
				sizes: "16x16",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/favicon-16x16-dark.png",
				type: "image/png",
				sizes: "16x16",
				media: "(prefers-color-scheme: dark)",
			},
			{
				url: "/favicon-32x32-light.png",
				type: "image/png",
				sizes: "32x32",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/favicon-32x32-dark.png",
				type: "image/png",
				sizes: "32x32",
				media: "(prefers-color-scheme: dark)",
			},
			{
				url: "/favicon-96x96-light.png",
				type: "image/png",
				sizes: "96x96",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/favicon-96x96-dark.png",
				type: "image/png",
				sizes: "96x96",
				media: "(prefers-color-scheme: dark)",
			},
		],
		apple: [
			{
				url: "/apple-touch-icon-light.png",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/apple-touch-icon-dark.png",
				media: "(prefers-color-scheme: dark)",
			},
		],
	},
	openGraph: {
		title: appName,
		description: appDescription,
		siteName: appName,
		url: "/",
		type: "website",
		// Static social-share image (resolved to an absolute URL via metadataBase).
		images: [{ url: "/og-agent.png", width: 1200, height: 630, alt: appName }],
	},
	twitter: {
		card: "summary_large_image",
		title: appName,
		description: appDescription,
		images: ["/og-agent.png"],
	},
};

export const viewport: Viewport = {
	themeColor: "#000000",
};

export default function Layout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={inter.className} suppressHydrationWarning>
			<body className="flex flex-col min-h-screen">
				{/* Themed PWA manifest: the browser picks the variant based on prefers-color-scheme. */}
				<link
					rel="manifest"
					href="/site-light.webmanifest"
					media="(prefers-color-scheme: light)"
				/>
				<link
					rel="manifest"
					href="/site-dark.webmanifest"
					media="(prefers-color-scheme: dark)"
				/>
				{/* Custom cursors — static file (outside the CSS pipeline) */}
				<link rel="stylesheet" href="/cursors.css" precedence="default" />
				<RootProvider theme={{ forcedTheme: "dark" }}>
					{children}
					<CustomScrollbar />
				</RootProvider>
			</body>
		</html>
	);
}
