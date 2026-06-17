import { Reveal } from "@/components/reveal";
import { SectionTitle } from "./section-title";

const features = [
	{
		title: "Plug-and-play",
		icon: "/img/plug-and-play.svg",
		desc: "Easy to install in 2 minutes on a community gaming platform and ready to use for all stakeholders.",
	},
	{
		title: "Permissionless",
		icon: "/img/permissionless.svg",
		desc: "Anyone can join, participate, and interact freely. The usefulness of the player map is beyond us!",
	},
	{
		title: "Valuable",
		icon: "/img/valuable.svg",
		desc: "Users will be interested in having their own player graph with their social / preferences / feedback graph.",
	},
];

export function PlayerGraphSection() {
	return (
		<section className="border-t border-white/10 bg-white/[0.02] px-6 py-24">
			<Reveal className="mx-auto max-w-6xl">
				<SectionTitle>Player Graph</SectionTitle>
				<p className="mt-6 text-left text-white/70">
					Agent Studio bridges the gap between game studios and their
					communities with the Player Map, an open-source, player-first toolkit.
					It turns player feedback and gaming data into actionable insights,
					giving studios clarity and players real impact with transparency.
				</p>

				<div className="mt-12 grid gap-6 md:grid-cols-3">
					{features.map((f) => (
						<div
							key={f.title}
							className="rounded-2xl border border-white/10 bg-black/40 p-6 text-center transition hover:border-brand/40"
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={f.icon} alt="" className="mx-auto h-16" />
							<h3 className="mt-4 text-lg font-bold text-brand">{f.title}</h3>
							<p className="mt-2 text-sm text-white/60">{f.desc}</p>
						</div>
					))}
				</div>
			</Reveal>
		</section>
	);
}
