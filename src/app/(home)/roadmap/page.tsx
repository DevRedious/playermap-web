import type { ReactNode } from "react";
import { RoadmapTabs } from "@/components/roadmap-tabs";

export const metadata = {
	title: "Roadmap",
	description: "Roadmap Agent Studio — what’s coming next.",
};

type Status = "completed" | "dev" | "not-started";

const BADGE: Record<Status, { label: string; cls: string }> = {
	completed: {
		label: "Completed",
		cls: "border-green-500/40 bg-green-500/10 text-green-400",
	},
	dev: {
		label: "In Development",
		cls: "border-blue-500/40 bg-blue-500/10 text-blue-400",
	},
	"not-started": {
		label: "Not Started",
		cls: "border-white/15 bg-white/5 text-white/50",
	},
};

type Item = {
	title: string;
	status: Status;
	statusLabel?: string;
	description: ReactNode;
};
type Category = { name: string; items: Item[] };

function Chevron() {
	return (
		<svg
			aria-hidden="true"
			className="chev h-4 w-4 shrink-0 text-brand"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m9 18 6-6-6-6" />
		</svg>
	);
}

function Badge({ status, label }: { status: Status; label?: string }) {
	const b = BADGE[status];
	return (
		<span
			className={`shrink-0 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium ${b.cls}`}
		>
			{label ?? b.label}
		</span>
	);
}

function CategoryBlock({ name, items }: Category) {
	return (
		<details className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
			<summary className="flex cursor-pointer items-center gap-2 px-4 py-3 text-base font-bold text-white">
				<Chevron />
				{name}
			</summary>
			<div className="space-y-1 px-2 pb-3 sm:px-3">
				{items.map((it) => (
					<details
						key={it.title}
						className="rounded-lg border-t border-white/5"
					>
						<summary className="flex cursor-pointer items-center justify-between gap-3 px-1 py-2.5">
							<span className="flex min-w-0 flex-1 items-center gap-2 text-sm text-white/80">
								<Chevron />
								<span className="min-w-0 [overflow-wrap:anywhere]">
									{it.title}
								</span>
							</span>
							<Badge status={it.status} label={it.statusLabel} />
						</summary>
						<div className="px-1 pb-3 pl-6 text-sm text-white/60 [overflow-wrap:anywhere]">
							{it.description}
						</div>
					</details>
				))}
			</div>
		</details>
	);
}

function Year({ categories }: { categories: Category[] }) {
	return (
		<div className="space-y-3">
			{categories.map((c) => (
				<CategoryBlock key={c.name} {...c} />
			))}
		</div>
	);
}

const y2025: Category[] = [
	{
		name: "Player Map",
		items: [
			{
				title: "Graph visualization component — Player Map v1",
				status: "completed",
				description: (
					<>
						Your gaming graph, built on trust and attestations, plugged on Base
						Mainnet (
						<a
							href="https://devfolio.co/projects/agent-player-map-759e"
							target="_blank"
							rel="noreferrer noopener"
							className="text-brand hover:underline"
						>
							Base Batch Europe
						</a>
						).
					</>
				),
			},
			{
				title: "Game Feedback component",
				status: "completed",
				description:
					"Attestations batch for players to give game feedback to game studios.",
			},
			{
				title: "Player Map website",
				status: "completed",
				description: "Installation guide and Player Map demo integration.",
			},
		],
	},
	{
		name: "Dashboard",
		items: [
			{
				title: "Coming Soon",
				status: "not-started",
				description:
					"This section is under construction. Please check back soon for updates.",
			},
		],
	},
];

const y2026: Category[] = [
	{
		name: "Player Map",
		items: [
			{
				title: "Query optimization",
				status: "completed",
				description:
					"Reduction in the number of requests and loading time divided by 10.",
			},
			{
				title: "UX-UI rework — Player Map v2",
				status: "completed",
				description:
					"Redesign to be more intuitive, accessible, and aligned with how players actually explore data and give feedback on game elements.",
			},
			{
				title: "Discord Activity",
				status: "dev",
				description: (
					<>
						- Player Map can be used on Discord as an app.
						<br />- Initialization of the account abstraction.
						<br />
						<span className="text-white/40">(waiting for approval)</span>
					</>
				),
			},
			{
				title: "Gamification",
				status: "not-started",
				description:
					"The ultimate player experience to be engaged in the game ecosystem.",
			},
		],
	},
	{
		name: "Dashboard",
		items: [
			{
				title: "Player-first game score",
				status: "completed",
				description:
					"Define and validate a player-first game score dynamic, including a categorization of attestations that provide added value to game studios.",
			},
			{
				title: "Player Map statistics",
				status: "completed",
				description:
					"Player Map data metrics for game studios and Player Map data analytics for Agent Studio.",
			},
			{
				title: "Global game statistics",
				status: "completed",
				description:
					"Real-time gaming ecosystem data analytics for game studios.",
			},
			{
				title: "Game statistics",
				status: "completed",
				description: "Real-time game data analytics for game studios.",
			},
			{
				title: "Campaigns",
				status: "not-started",
				description:
					"Create campaigns with selected attestations for a game community over a given period, to better align with the stages of video game development.",
			},
		],
	},
	{
		name: "Game tooling",
		items: [
			{
				title: "Web2 game community app",
				status: "not-started",
				description:
					"This section is under construction with a AAA studio. Please check back soon for updates.",
			},
		],
	},
];

const comingSoon = (name: string): Category => ({
	name,
	items: [
		{
			title: "Coming Soon",
			status: "not-started",
			description:
				"This section is under construction. Please check back soon for updates.",
		},
	],
});

const y2027: Category[] = [
	comingSoon("Player Map"),
	comingSoon("Dashboard"),
	comingSoon("Game tooling"),
];

export default function RoadmapPage() {
	return (
		<main className="roadmap mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
			<h1 className="text-3xl font-bold text-brand md:text-4xl">
				Roadmap Agent Studio
			</h1>
			<p className="mt-2 text-white/60">What’s coming next?</p>

			<div className="mt-10">
				<RoadmapTabs
					defaultIndex={1}
					tabs={[
						{ label: "2025", content: <Year categories={y2025} /> },
						{ label: "2026", content: <Year categories={y2026} /> },
						{ label: "2027", content: <Year categories={y2027} /> },
					]}
				/>
			</div>
		</main>
	);
}
