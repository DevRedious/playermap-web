import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { BrandLogo } from "@/components/brand-logo";
import { appUrl, gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
	return {
		nav: {
			title: <BrandLogo className="h-6 w-auto" />,
			transparentMode: "top",
		},
		// Single theme (dark) locked via RootProvider → we remove the theme switch
		// from the navbar and the sidebar. The search palette (Ctrl+K) stays.
		themeSwitch: { enabled: false },
		githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
		links: [
			{ text: "Docs", url: "/docs", active: "nested-url" },
			{ text: "Blog", url: "/blog", active: "nested-url" },
			{ text: "Roadmap", url: "/roadmap", active: "nested-url" },
			{ type: "button", text: "Launch app", url: appUrl, external: true },
		],
	};
}
