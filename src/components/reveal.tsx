"use client";

import { type ReactNode, useEffect, useRef } from "react";

/**
 * Animates the appearance of its content on scroll (fade + translate).
 * Respects prefers-reduced-motion (handled in CSS, see `.reveal` in global.css)
 * and reveals immediately if IntersectionObserver is unavailable.
 */
export function Reveal({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (!("IntersectionObserver" in window)) {
			el.classList.add("is-visible");
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						el.classList.add("is-visible");
						io.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<div ref={ref} className={`reveal ${className}`}>
			{children}
		</div>
	);
}
