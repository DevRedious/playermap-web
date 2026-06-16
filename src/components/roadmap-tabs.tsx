"use client";

import { type ReactNode, useRef, useState } from "react";

export function RoadmapTabs({
	tabs,
	defaultIndex = 0,
}: {
	tabs: { label: string; content: ReactNode }[];
	defaultIndex?: number;
}) {
	const [active, setActive] = useState(defaultIndex);
	const [allExpanded, setAllExpanded] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	const selectTab = (i: number) => {
		setActive(i);
		setAllExpanded(false); // the new tab is displayed collapsed
	};

	const toggleAll = () => {
		const next = !allExpanded;
		contentRef.current?.querySelectorAll("details").forEach((d) => {
			d.open = next;
		});
		setAllExpanded(next);
	};

	return (
		<div>
			<div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
				<div className="flex flex-wrap gap-1">
					{tabs.map((t, i) => (
						<button
							key={t.label}
							type="button"
							onClick={() => selectTab(i)}
							className={`-mb-px min-w-[92px] border-b-2 px-4 py-2 text-center text-sm font-semibold transition-colors ${
								i === active
									? "border-brand text-brand"
									: "border-transparent text-white/50 hover:text-white"
							}`}
						>
							{t.label}
						</button>
					))}
				</div>

				<button
					type="button"
					onClick={toggleAll}
					className="mb-2 inline-flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:border-brand hover:text-brand"
				>
					<svg
						aria-hidden="true"
						className={`h-3.5 w-3.5 transition-transform ${allExpanded ? "rotate-180" : ""}`}
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="m7 6 5 5 5-5" />
						<path d="m7 13 5 5 5-5" />
					</svg>
					{allExpanded ? "Collapse all" : "Expand all"}
				</button>
			</div>

			<div ref={contentRef} className="mt-6 min-h-[300px]">
				{tabs[active]?.content}
			</div>
		</div>
	);
}
