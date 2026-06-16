"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MIN_THUMB = 40; // px — minimum thumb height to stay grabbable
const IDLE_MS = 1200; // idle delay before fading out

/**
 * Custom scrollbar in the app's colors: no system track/background, just a thin
 * golden thumb that follows (and drives) the page scroll, and that fades out
 * after a short period of inactivity.
 *
 * The native scrollbar is hidden via `global.css`. This component renders a thumb
 * as a `position: fixed` overlay, updated on scroll / resize / content change,
 * and draggable with the mouse.
 *
 * Mount only once (root layout) to cover all pages.
 */
export function CustomScrollbar() {
	const [mounted, setMounted] = useState(false);
	const [active, setActive] = useState(false); // true = visible, false = faded out
	const [metrics, setMetrics] = useState({
		visible: false,
		thumbHeight: 0,
		thumbTop: 0,
	});

	const drag = useRef<{ startY: number; startScroll: number } | null>(null);
	const ticking = useRef(false);
	const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const hovering = useRef(false);

	const compute = useCallback(() => {
		const doc = document.documentElement;
		const viewport = window.innerHeight;
		const scrollHeight = doc.scrollHeight;
		const maxScroll = scrollHeight - viewport;

		// Hidden if the page isn't scrollable, or during a scroll lock (modal)
		if (maxScroll <= 1 || document.body.hasAttribute("data-scroll-locked")) {
			setMetrics((m) => (m.visible ? { ...m, visible: false } : m));
			return;
		}

		const trackHeight = viewport;
		const thumbHeight = Math.max(
			MIN_THUMB,
			(viewport / scrollHeight) * trackHeight,
		);
		const thumbTop = (window.scrollY / maxScroll) * (trackHeight - thumbHeight);

		setMetrics({ visible: true, thumbHeight, thumbTop });
	}, []);

	const requestCompute = useCallback(() => {
		if (ticking.current) return;
		ticking.current = true;
		requestAnimationFrame(() => {
			ticking.current = false;
			compute();
		});
	}, [compute]);

	// Wakes the thumb and schedules its fade-out after inactivity
	const wake = useCallback(() => {
		setActive(true);
		if (idleTimer.current) clearTimeout(idleTimer.current);
		idleTimer.current = setTimeout(() => {
			// Stays visible as long as we're hovering or dragging
			if (!hovering.current && !drag.current) setActive(false);
		}, IDLE_MS);
	}, []);

	useEffect(() => {
		setMounted(true);
		compute();
		wake();

		const onScroll = () => {
			wake();
			requestCompute();
		};
		const onResize = () => {
			wake();
			requestCompute();
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onResize);

		// Recompute (without waking) on content change / scroll lock
		const ro = new ResizeObserver(requestCompute);
		ro.observe(document.body);
		const mo = new MutationObserver(requestCompute);
		mo.observe(document.body, {
			attributes: true,
			attributeFilter: ["data-scroll-locked", "style"],
		});

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onResize);
			ro.disconnect();
			mo.disconnect();
			if (idleTimer.current) clearTimeout(idleTimer.current);
		};
	}, [compute, requestCompute, wake]);

	// Moving the thumb with the mouse
	useEffect(() => {
		const onMove = (e: PointerEvent) => {
			if (!drag.current) return;
			const doc = document.documentElement;
			const viewport = window.innerHeight;
			const maxScroll = doc.scrollHeight - viewport;
			const thumbHeight = Math.max(
				MIN_THUMB,
				(viewport / doc.scrollHeight) * viewport,
			);
			const scrollableTrack = viewport - thumbHeight;
			if (scrollableTrack <= 0) return;
			const deltaY = e.clientY - drag.current.startY;
			window.scrollTo(
				0,
				drag.current.startScroll + (deltaY / scrollableTrack) * maxScroll,
			);
		};
		const onUp = () => {
			drag.current = null;
			document.body.style.userSelect = "";
			wake(); // restart the fade-out timer after the drag
		};
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp);
		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
		};
	}, [wake]);

	const onThumbDown = (e: React.PointerEvent) => {
		e.preventDefault();
		drag.current = { startY: e.clientY, startScroll: window.scrollY };
		document.body.style.userSelect = "none";
		setActive(true);
	};

	if (!mounted || !metrics.visible) return null;

	return (
		<div
			aria-hidden
			className="pointer-events-none fixed right-0 top-0 z-[60] h-screen w-2.5"
		>
			<button
				type="button"
				aria-label="Scroll"
				onPointerDown={onThumbDown}
				onPointerEnter={() => {
					hovering.current = true;
					setActive(true);
					if (idleTimer.current) clearTimeout(idleTimer.current);
				}}
				onPointerLeave={() => {
					hovering.current = false;
					wake();
				}}
				className={`absolute right-[3px] w-1.5 cursor-grab rounded-full bg-brand/80 transition-opacity duration-300 hover:bg-brand active:cursor-grabbing active:bg-brand ${
					active
						? "pointer-events-auto opacity-100"
						: "pointer-events-none opacity-0"
				}`}
				style={{ height: metrics.thumbHeight, top: metrics.thumbTop }}
			/>
		</div>
	);
}
