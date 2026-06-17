import type { ReactNode } from "react";

export type Status = "completed" | "dev" | "not-started";

export type Item = {
	title: string;
	status: Status;
	statusLabel?: string;
	description: ReactNode;
};

export type Category = { name: string; items: Item[] };

export const y2025: Category[] = [
	{
		name: "Player Map",
		items: [
			{
				title: "Graph visualization component (Player Map v1)",
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

export const y2026: Category[] = [
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
				title: "UX-UI rework (Player Map v2)",
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

export const y2027: Category[] = [
	comingSoon("Player Map"),
	comingSoon("Dashboard"),
	comingSoon("Game tooling"),
];
