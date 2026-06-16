export const appName = "Player Map";
export const appDescription =
	"Open Source Player graph — a social and feedback graph for gaming. Visualize players, guilds and games, give feedback on game elements, and prove your track record on-chain.";
export const docsRoute = "/docs";
export const docsImageRoute = "/og/docs";
export const docsContentRoute = "/llms.mdx/docs";

// URL of the live graph application (the existing untouched app).
// Override via NEXT_PUBLIC_APP_URL — no secret required.
export const appUrl =
	process.env.NEXT_PUBLIC_APP_URL ??
	"https://playermap.box/test-player-map/index.html";

// Canonical URL of this site (used for metadata, sitemap and robots).
// Override via NEXT_PUBLIC_SITE_URL — no secret required.
export const siteUrl = (
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://playermap.box"
).replace(/\/$/, "");

export const socialLinks = {
	github: "https://github.com/Agent-BossFighters/Player-map",
	discord: "https://discord.gg/zqBPwgEsCC",
	x: "https://x.com/Agent_OSP",
};

export const gitConfig = {
	user: "Agent-BossFighters",
	repo: "Player-map",
	branch: "main",
};
