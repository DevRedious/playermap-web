import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { appUrl } from "@/lib/shared";

export function CtaSection() {
	return (
		<section className="px-6 py-24 text-center">
			<Reveal>
				<h2 className="text-3xl font-extrabold md:text-4xl">
					Give players a real voice.
				</h2>
				<p className="mx-auto mt-4 max-w-xl text-white/60">
					Player Map is not just a visualization tool, it’s a social and
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
	);
}
