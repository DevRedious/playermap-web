import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { appUrl, socialLinks } from "@/lib/shared";

type LinkDef = { label: string; href: string; external?: boolean };

const columns: { title: string; links: LinkDef[] }[] = [
	{
		title: "Product",
		links: [
			{ label: "Docs", href: "/docs" },
			{ label: "Blog", href: "/blog" },
			{ label: "Roadmap", href: "/roadmap" },
			{ label: "Launch app", href: appUrl, external: true },
		],
	},
	{
		title: "Community",
		links: [
			{ label: "Discord", href: socialLinks.discord, external: true },
			{ label: "X", href: socialLinks.x, external: true },
			{ label: "GitHub", href: socialLinks.github, external: true },
		],
	},
	{
		title: "Legal",
		links: [
			{ label: "Legal Notice", href: "/legal-notice" },
			{ label: "Privacy Policy", href: "/privacy-policy" },
			{ label: "Terms of Service", href: "/terms-of-service" },
			{ label: "Risk Disclosure", href: "/risk-disclosure" },
			{ label: "Open Source", href: "/open-source" },
		],
	},
];

function FooterLink({ label, href, external }: LinkDef) {
	const cls = "text-sm text-white/60 transition-colors hover:text-brand";
	return external ? (
		<a href={href} target="_blank" rel="noreferrer noopener" className={cls}>
			{label}
		</a>
	) : (
		<Link href={href} className={cls}>
			{label}
		</Link>
	);
}

function SocialIcon({
	href,
	label,
	children,
}: {
	href: string;
	label: string;
	children: React.ReactNode;
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noreferrer noopener"
			aria-label={label}
			className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-brand hover:text-brand"
		>
			{children}
		</a>
	);
}

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-white/10 bg-black text-white">
			<div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
				{/* Brand */}
				<div>
					<Link href="/" className="inline-flex items-center">
						{/* Footer is always black → dark variant (white text) forced. */}
						<BrandLogo className="h-7 w-auto" fixed="dark" />
					</Link>
					<p className="mt-3 max-w-xs text-sm text-white/50">
						Open Source Player graph — a social &amp; feedback graph for gaming.
					</p>
					<div className="mt-5 flex gap-3">
						<SocialIcon href={socialLinks.discord} label="Discord">
							<svg
								aria-hidden="true"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="h-4 w-4"
							>
								<path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.036A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.08.08 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127c-.598.349-1.225.645-1.873.891a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.42 0-1.332.956-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.418 0 1.334-.956 2.42-2.157 2.42zm7.975 0c-1.183 0-2.157-1.086-2.157-2.42 0-1.332.955-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.418 0 1.334-.946 2.42-2.157 2.42z" />
							</svg>
						</SocialIcon>
						<SocialIcon href={socialLinks.x} label="X">
							<svg
								aria-hidden="true"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="h-4 w-4"
							>
								<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
							</svg>
						</SocialIcon>
						<SocialIcon href={socialLinks.github} label="GitHub">
							<svg
								aria-hidden="true"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="h-4 w-4"
							>
								<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.467-2.38 1.236-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.595 24 12.297c0-6.627-5.373-12-12-12" />
							</svg>
						</SocialIcon>
					</div>
				</div>

				{/* Link columns */}
				{columns.map((col) => (
					<div key={col.title}>
						<h3 className="text-xs font-bold uppercase tracking-wider text-white/40">
							{col.title}
						</h3>
						<ul className="mt-4 space-y-2.5">
							{col.links.map((l) => (
								<li key={l.label}>
									<FooterLink {...l} />
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			<div className="border-t border-white/10">
				<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-white/40 sm:flex-row">
					<span>© {year} Agent Player Map. Open Source Player graph.</span>
					<span>Built with Next.js &amp; Fumadocs.</span>
				</div>
			</div>
		</footer>
	);
}
