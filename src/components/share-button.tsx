"use client";

import { useState } from "react";

/**
 * Small share button: opens the native share sheet (Web Share API,
 * mostly mobile) if available, otherwise copies the link to the clipboard.
 */
export function ShareButton({ title }: { title: string }) {
	const [copied, setCopied] = useState(false);

	const onShare = async () => {
		const url = typeof window !== "undefined" ? window.location.href : "";
		if (navigator.share) {
			try {
				await navigator.share({ title, url });
				return;
			} catch {
				// share cancelled → fall back to copying
			}
		}
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// clipboard unavailable: do nothing blocking
		}
	};

	return (
		<button
			type="button"
			onClick={onShare}
			aria-label="Share this post"
			className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/70 transition-colors hover:border-brand hover:text-brand"
		>
			<svg
				aria-hidden="true"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
				className="h-4 w-4"
			>
				<path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
				<path d="M16 6l-4-4-4 4" />
				<path d="M12 2v14" />
			</svg>
			{copied ? "Copied!" : "Share"}
		</button>
	);
}
