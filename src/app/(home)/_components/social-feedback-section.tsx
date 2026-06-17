import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function SocialFeedbackSection() {
	return (
		<section className="mx-auto max-w-6xl px-6 py-24">
			<Reveal className="grid gap-12 md:grid-cols-2">
				<div className="text-center">
					<h3 className="text-2xl font-bold text-brand">⚡ Social</h3>
					<div className="mt-6 flex h-[320px] items-center justify-center">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src="/img/graph.gif"
							alt="Player map graph"
							className="h-full w-auto rounded-xl"
						/>
					</div>
					<p className="mt-6 text-left text-white/70">
						Visualize the gaming ecosystem (players, guilds, etc.), find your
						place within the community or a guild that matches your values, and
						explore to recruit your future teammates. This on-chain
						certification system lets gamers prove their track record.
					</p>
				</div>
				<div className="text-center">
					<h3 className="text-2xl font-bold text-brand">⚡ Feedback</h3>
					<div className="mt-6 flex h-[320px] items-center justify-center">
						<Image
							src="/img/feedback.jpg"
							alt="Player feedback"
							width={943}
							height={728}
							sizes="(min-width: 768px) 420px, 90vw"
							className="h-full max-h-[320px] w-auto rounded-xl border border-white/10"
						/>
					</div>
					<p className="mt-6 text-left text-white/70">
						Give feedback on the game’s ecosystem (game, maps and characters) by
						indicating whether you’re “for” or “against” each statement, and
						change your opinion anytime depending on your experience,
						interactions, or an update.
					</p>
				</div>
			</Reveal>
		</section>
	);
}
