import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Page not found",
	robots: { index: false, follow: false },
};

export default function NotFound() {
	return (
		<main className="flex min-h-[70vh] flex-1 flex-col items-center justify-center px-6 py-24 text-center">
			<p className="text-7xl font-extrabold tracking-tight text-brand md:text-8xl">
				404
			</p>
			<h1 className="mt-4 text-2xl font-bold text-white md:text-3xl">
				This page got lost in the graph.
			</h1>
			<p className="mt-3 max-w-md text-white/60">
				The page you’re looking for doesn’t exist or has moved.
			</p>

			<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
				<Link
					href="/"
					className="rounded-full bg-brand px-7 py-3 font-bold uppercase text-black transition hover:scale-105 hover:bg-brand-strong"
				>
					Back home
				</Link>
				<Link
					href="/docs"
					className="rounded-full border-2 border-brand px-7 py-3 font-bold uppercase text-brand transition hover:bg-brand hover:text-black"
				>
					Read the docs
				</Link>
			</div>
		</main>
	);
}
