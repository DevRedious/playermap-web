import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "./section-title";

export function WhySection() {
	return (
		<section className="mx-auto max-w-6xl px-6 py-24">
			<Reveal>
				<SectionTitle>Why?</SectionTitle>
				<p className="mt-6 text-left text-white/70">
					More video games are being developed with a “Player first” approach,
					working in close collaboration with those who play, interact with,
					stream or watch the game. Success in gaming depends on the game
					community, so the “Player first” approach brings real challenges:
				</p>

				<div className="mt-12 grid items-center gap-8 md:grid-cols-[1.4fr_1fr_1.4fr]">
					<div className="self-center">
						<h3 className="whitespace-nowrap text-xl font-bold text-white">
							⚡ Studio side
						</h3>
						<ul className="mt-3 space-y-2 whitespace-nowrap text-sm text-white/60">
							<li>- Difficulty having player analytics &amp; telemetry</li>
							<li>- Visualize community feedback (context, real time)</li>
							<li>- Manage toxicity / cheating</li>
						</ul>
					</div>
					<div className="flex justify-center">
						<Image
							src="/img/challenges.jpg"
							alt="Challenges between studios and communities"
							width={924}
							height={650}
							sizes="(min-width: 768px) 400px, 100vw"
							className="h-auto w-full max-w-md rounded-xl border border-white/10"
						/>
					</div>
					<div className="self-center">
						<h3 className="whitespace-nowrap text-xl font-bold text-white">
							⚡ Community side
						</h3>
						<ul className="mt-3 space-y-2 whitespace-nowrap text-sm text-white/60">
							<li>- Frustration for game ecosystem visibility</li>
							<li>- Social loss when changing games</li>
							<li>- Loss of actionable player insights</li>
						</ul>
					</div>
				</div>
			</Reveal>
		</section>
	);
}
