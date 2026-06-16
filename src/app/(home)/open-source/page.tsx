/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import type { ReactNode } from "react";

export const metadata = { title: "Open Source" };

function ALogo() {
	return (
		<img
			src="/img/agent-dark.svg"
			alt="A"
			className="inline-block h-8 md:h-9"
		/>
	);
}

function ValueBlock({
	heading,
	children,
}: {
	heading: ReactNode;
	children: ReactNode;
}) {
	return (
		<div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
			<div className="flex items-center justify-center gap-0.5 text-2xl font-bold text-brand md:text-3xl">
				{heading}
			</div>
			<div className="mt-4 space-y-3 text-justify text-sm text-white/70">
				{children}
			</div>
		</div>
	);
}

export default function OpenSourcePage() {
	return (
		<main className="mx-auto w-full max-w-5xl px-6 py-16 text-white">
			{/* Header */}
			<div className="flex flex-wrap items-center justify-center gap-3">
				<h1 className="text-3xl font-bold md:text-4xl">WHY</h1>
				<Image
					src="/img/Agent.png"
					alt="Agent Studio"
					width={1560}
					height={413}
					sizes="(min-width: 768px) 240px, 200px"
					className="h-14 w-auto md:h-16"
					priority
				/>
				<h1 className="text-3xl font-bold md:text-4xl">IS OPEN SOURCE?</h1>
			</div>

			{/* Intro */}
			<div className="mx-auto mt-10 max-w-3xl space-y-4 text-justify text-white/70">
				<p>
					Agent Studio is a decentralized organization that proposes open source
					products. That means our code is freely available for users to
					inspect, run and contribute to.
				</p>
				<p>
					Why give away something valuable for free? That’s a fair question, as
					being open source seems to be at odds with running a successful
					company.
				</p>
				<p>
					When we started to build the product for the gaming community, we had
					a clear vision: make a product that is accessible, transparent,
					innovative and user-first. Being open source allows us to accomplish
					that.
					<br />
					Our decision to be open source wasn’t a business move. Our motivation
					is deeply rooted in our core values, the product we want to develop,
					and the community we want to build.
				</p>
			</div>

			{/* Values — the agent-dark.svg logo serves as the letter “A” */}
			<div className="mt-12 grid gap-6 md:grid-cols-2">
				<ValueBlock
					heading={
						<>
							<ALogo />
							<span>CCESSIBLE</span>
						</>
					}
				>
					<p>
						The product is designed not to exclude potential users. Whether
						physical, intellectual/cognitive or digital, our user-centered
						design aims at accessibility for all.
					</p>
					<p>Why should we recommend inclusion without doing it ourselves?</p>
					<p>
						This way, we can be sure of having a panel of users who will really
						be able to respond to the studios’ problems — naturally, by giving
						importance and power to each “atom”.
					</p>
				</ValueBlock>

				<ValueBlock
					heading={
						<>
							<span>TR</span>
							<ALogo />
							<span>NSPARENT</span>
						</>
					}
				>
					<p>
						Too many analytics products act like black boxes. You send your data
						in and you get back a chart, but no idea how it was calculated, what
						assumptions were made, or where else that data is being used.
					</p>
					<p>
						As a facilitator between community and game studios, trust is
						essential. Being open source lets users inspect the code and
						contribute patches and ideas. By being totally transparent, we build
						lasting trust with our users.
					</p>
				</ValueBlock>

				<ValueBlock
					heading={
						<>
							<span>INNOV</span>
							<ALogo />
							<span>TIVE</span>
						</>
					}
				>
					<p>
						Innovation rarely happens in isolation. By being open source we
						invite a global community of developers, analysts and product
						engineers to help us improve — to build features we haven’t thought
						of, fix bugs we haven’t caught, and tackle use cases we haven’t
						seen.
					</p>
					<p>
						That’s the beauty of open source: it turns users into collaborators,
						and lets unique problems find unique solutions — often shared back.
					</p>
				</ValueBlock>

				<ValueBlock
					heading={
						<>
							<ALogo />
							<span>DVOCATE</span>
						</>
					}
				>
					<p>
						Companies usually gather feedback to help drive their roadmap, but
						the decision ultimately ends up with the company. Users have very
						little actual influence over the product they use.
					</p>
					<p>
						With our web3 features, we invite users to make a real impact in
						their community, so that it grows and helps the studio in its
						player-first approach.
					</p>
				</ValueBlock>
			</div>
		</main>
	);
}
