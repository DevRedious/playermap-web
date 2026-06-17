import { RoadmapTabs } from "@/components/roadmap-tabs";
import {
	type Category,
	type Status,
	y2025,
	y2026,
	y2027,
} from "./roadmap-data";

export const metadata = {
	title: "Roadmap",
	description: "Roadmap Agent Studio: what’s coming next.",
};

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
		<div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
			<div className="flex items-center gap-2 px-4 py-3 text-base font-bold text-white">
				{name}
			</div>
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
		</div>
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
