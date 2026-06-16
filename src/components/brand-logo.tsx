/* eslint-disable @next/next/no-img-element */
import { appName } from "@/lib/shared";

/**
 * Agent logo lockup (icon + wordmark).
 * - by default: theme-adaptive (light variant = black text in light theme,
 *   dark variant = white text in dark theme), driven by the `.dark` class.
 * - `fixed="dark"` / `fixed="light"`: force a variant (e.g. footer always black).
 */
export function BrandLogo({
	className = "h-6 w-auto",
	fixed,
}: {
	className?: string;
	fixed?: "dark" | "light";
}) {
	if (fixed) {
		return (
			<img src={`/img/name-${fixed}.svg`} alt={appName} className={className} />
		);
	}

	return (
		<>
			<img
				src="/img/name-light.svg"
				alt={appName}
				className={`logo-themed--light ${className}`}
			/>
			<img
				src="/img/name-dark.svg"
				alt={appName}
				className={`logo-themed--dark ${className}`}
			/>
		</>
	);
}
