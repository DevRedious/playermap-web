"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { appUrl } from "@/lib/shared";

function clamp(n: number, min = 0, max = 1) {
	return Math.max(min, Math.min(max, n));
}

export function Hero() {
	const ref = useRef<HTMLElement | null>(null);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [progress, setProgress] = useState(0);

	// Respect prefers-reduced-motion: freeze the video on the poster.
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const apply = () => {
			const v = videoRef.current;
			if (!v) return;
			if (mq.matches) {
				v.autoplay = false;
				v.pause();
			} else {
				v.autoplay = true;
				void v.play().catch(() => {});
			}
		};
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, []);

	useEffect(() => {
		const onScroll = () => {
			const vh = window.innerHeight || 1;
			setProgress(clamp(window.scrollY / (vh * 0.2)));
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);

	return (
		<header
			ref={ref}
			// -mt-14: pulls the hero up under the sticky navbar (= margin-top: -navbar-height
			// from the original) so it truly fills the screen.
			className="relative -mt-14 flex h-[100svh] items-center justify-center overflow-hidden bg-black text-white"
		>
			{/* Background video — poster shown instantly, video loaded afterwards. */}
			<video
				ref={videoRef}
				autoPlay
				loop
				muted
				playsInline
				preload="metadata"
				poster="/img/background-poster.jpg"
				className="absolute inset-0 z-0 h-full w-full object-cover opacity-50"
			>
				<source src="/img/background.mp4" type="video/mp4" />
			</video>
			<div className="absolute inset-0 z-0 bg-black/20" />

			{/* Hero content (fades out on scroll) */}
			<div
				className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
				style={{
					opacity: 1 - progress,
					transform: `translateY(${progress * 20}px)`,
					transition: "opacity 0.2s linear, transform 0.2s linear",
				}}
			>
				{/* The diamond: square rotated 45°, golden border, dark background — BEHIND the content */}
				<div
					aria-hidden
					className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[25px] border-2 border-brand bg-black/60 md:block"
				/>

				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src="/img/agent-dark.svg"
					alt="Player Map"
					className="w-36 md:w-52"
				/>
				<h1 className="mt-3 text-5xl font-bold uppercase tracking-tight text-brand md:text-6xl">
					Player Map
				</h1>
				<h2 className="mt-1 text-xl font-light uppercase tracking-wide text-white md:text-2xl">
					Open Source Player graph
				</h2>

				<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
					<a
						href={appUrl}
						className="rounded-full bg-brand px-7 py-3 font-bold uppercase text-black transition hover:scale-105 hover:bg-brand-strong"
					>
						Launch app
					</a>
					<Link
						href="/docs"
						className="rounded-full border-2 border-brand px-7 py-3 font-bold uppercase text-brand transition hover:bg-brand hover:text-black"
					>
						Install · 2 min
					</Link>
				</div>
			</div>

			{/* Scroll indicator */}
			<div
				className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
				style={{
					opacity: progress > 0.5 ? 0 : 0.8,
					transition: "opacity 0.3s ease",
				}}
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src="/img/down.svg" alt="" className="w-16 animate-bounce" />
			</div>
		</header>
	);
}
