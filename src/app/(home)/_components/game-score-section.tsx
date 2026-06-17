import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function GameScoreSection() {
	return (
		<section className="border-t border-white/10 bg-white/[0.02] px-6 py-24">
			<Reveal className="mx-auto max-w-5xl text-center">
				<h3 className="text-2xl font-bold uppercase tracking-wide text-brand">
					⚡ Player First Game Score
				</h3>
				<Image
					src="/img/gamescore.jpg"
					alt="Player first game score"
					width={773}
					height={280}
					sizes="(min-width: 768px) 773px, 100vw"
					className="mx-auto mt-8 h-auto w-full rounded-xl border border-white/10"
				/>
				<p className="mt-6 text-left text-white/70">
					Visualize a real-time player-first game score and global game
					statistics based on Player Map feedback about Experience, Community,
					Monetization and Trust. Our live game score is contextualized,
					counters review-bombing vulnerability, and will be weighted by playing
					time. A dashboard for game studios is on the roadmap.
				</p>
			</Reveal>
		</section>
	);
}
