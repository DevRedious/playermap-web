import { CtaSection } from "./_components/cta-section";
import { GameScoreSection } from "./_components/game-score-section";
import { Hero } from "./_components/hero";
import { PlayerGraphSection } from "./_components/player-graph-section";
import { SocialFeedbackSection } from "./_components/social-feedback-section";
import { WhySection } from "./_components/why-section";

export default function HomePage() {
	return (
		<>
			<Hero />

			<main className="bg-black text-white">
				<WhySection />
				<PlayerGraphSection />
				<SocialFeedbackSection />
				<GameScoreSection />
				<CtaSection />
			</main>
		</>
	);
}
