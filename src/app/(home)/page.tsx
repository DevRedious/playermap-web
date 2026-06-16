import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { appUrl } from "@/lib/shared";
import { Hero } from "./_components/hero";

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

function SectionTitle({ children }: { children: React.ReactNode }) {
	return (
		<h2 className="text-center text-3xl font-extrabold uppercase tracking-wide text-brand md:text-4xl">
			{children}
		</h2>
	);
}

export default function HomePage() {
	return (
		<>
			<Hero />

			<main className="bg-black text-white">
				{/* ── WHY ─────────────────────────────────────────────── */}
				<section className="mx-auto max-w-6xl px-6 py-24">
					<Reveal>
						<SectionTitle>Why?</SectionTitle>
						<p className="mx-auto mt-6 max-w-3xl text-center text-white/70">
							More video games are being developed with a “Player first”
							approach, working in close collaboration with those who play,
							interact with, stream or watch the game. Success in gaming depends
							on the game community — so the “Player first” approach brings real
							challenges:
						</p>

						<div className="mt-12 grid items-center gap-8 md:grid-cols-3">
							<div>
								<h3 className="text-xl font-bold text-white">⚡ Studio side</h3>
								<ul className="mt-3 space-y-2 text-white/60">
									<li>— Difficulty having player analytics &amp; telemetry</li>
									<li>— Visualize community feedback (context, real time)</li>
									<li>— Manage toxicity / cheating</li>
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
							<div>
								<h3 className="text-xl font-bold text-white">
									⚡ Community side
								</h3>
								<ul className="mt-3 space-y-2 text-white/60">
									<li>— Frustration for game ecosystem visibility</li>
									<li>— Social loss when changing games</li>
									<li>— Loss of actionable player insights</li>
								</ul>
							</div>
						</div>
					</Reveal>
				</section>

				{/* ── PLAYER GRAPH ────────────────────────────────────── */}
				<section className="border-t border-white/10 bg-white/[0.02] px-6 py-24">
					<Reveal className="mx-auto max-w-6xl">
						<SectionTitle>Player Graph</SectionTitle>
						<p className="mx-auto mt-6 max-w-3xl text-center text-white/70">
							Agent Studio bridges the gap between game studios and their
							communities with the Player Map — an open-source, player-first
							toolkit. It turns player feedback and gaming data into actionable
							insights, giving studios clarity and players real impact with
							transparency.
						</p>

						<div className="mt-12 grid gap-6 md:grid-cols-3">
							{features.map((f) => (
								<div
									key={f.title}
									className="rounded-2xl border border-white/10 bg-black/40 p-6 text-center transition hover:border-brand/40"
								>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src={f.icon} alt="" className="mx-auto h-16" />
									<h3 className="mt-4 text-lg font-bold text-brand">
										{f.title}
									</h3>
									<p className="mt-2 text-sm text-white/60">{f.desc}</p>
								</div>
							))}
						</div>
					</Reveal>
				</section>

				{/* ── SOCIAL / FEEDBACK ───────────────────────────────── */}
				<section className="mx-auto max-w-6xl px-6 py-24">
					<Reveal className="grid gap-12 md:grid-cols-2">
						<div className="text-center">
							<h3 className="text-2xl font-bold text-brand">⚡ Social</h3>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="/img/graph.gif"
								alt="Player map graph"
								className="mx-auto mt-6 h-[320px] w-auto rounded-xl"
							/>
							<p className="mt-6 text-left text-white/70">
								Visualize the gaming ecosystem (players, guilds, etc.), find
								your place within the community or a guild that matches your
								values, and explore to recruit your future teammates. This
								on-chain certification system lets gamers prove their track
								record.
							</p>
						</div>
						<div className="text-center">
							<h3 className="text-2xl font-bold text-brand">⚡ Feedback</h3>
							<Image
								src="/img/feedback.jpg"
								alt="Player feedback"
								width={943}
								height={728}
								sizes="(min-width: 768px) 420px, 90vw"
								className="mx-auto mt-6 max-h-[320px] w-auto rounded-xl border border-white/10"
							/>
							<p className="mt-6 text-left text-white/70">
								Give feedback on the game’s ecosystem — game, maps and
								characters — by indicating whether you’re “for” or “against”
								each statement, and change your opinion anytime depending on
								your experience, interactions, or an update.
							</p>
						</div>
					</Reveal>
				</section>

				{/* ── PLAYER FIRST GAME SCORE ─────────────────────────── */}
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
							statistics based on Player Map feedback about Experience,
							Community, Monetization and Trust. Our live game score is
							contextualized, counters review-bombing vulnerability, and will be
							weighted by playing time. A dashboard for game studios is on the
							roadmap.
						</p>
					</Reveal>
				</section>

				{/* ── CTA ─────────────────────────────────────────────── */}
				<section className="px-6 py-24 text-center">
					<Reveal>
						<h2 className="text-3xl font-extrabold md:text-4xl">
							Give players a real voice.
						</h2>
						<p className="mx-auto mt-4 max-w-xl text-white/60">
							Player Map is not just a visualization tool — it’s a social and
							feedback graph for gaming.
						</p>
						<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
							<a
								href={appUrl}
								className="rounded-md bg-brand px-6 py-3 font-bold text-black transition hover:scale-105 hover:bg-brand-strong"
							>
								Launch app →
							</a>
							<Link
								href="/docs"
								className="rounded-md border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-brand hover:text-brand"
							>
								Read the docs
							</Link>
						</div>
					</Reveal>
				</section>
			</main>
		</>
	);
}
