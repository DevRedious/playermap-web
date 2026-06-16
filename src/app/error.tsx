"use client";

import { useEffect } from "react";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Surface the error on the client side (visible in the console / monitoring).
		console.error(error);
	}, [error]);

	return (
		<main className="flex min-h-[70vh] flex-1 flex-col items-center justify-center px-6 py-24 text-center">
			<p className="text-6xl font-extrabold tracking-tight text-brand md:text-7xl">
				Oops
			</p>
			<h1 className="mt-4 text-2xl font-bold text-white md:text-3xl">
				Something went wrong.
			</h1>
			<p className="mt-3 max-w-md text-white/60">
				An unexpected error occurred. You can try again or head back home.
			</p>

			<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
				<button
					type="button"
					onClick={reset}
					className="rounded-full bg-brand px-7 py-3 font-bold uppercase text-black transition hover:scale-105 hover:bg-brand-strong"
				>
					Try again
				</button>
				<a
					href="/"
					className="rounded-full border-2 border-brand px-7 py-3 font-bold uppercase text-brand transition hover:bg-brand hover:text-black"
				>
					Back home
				</a>
			</div>
		</main>
	);
}
