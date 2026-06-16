import { generate as DefaultImage } from "fumadocs-ui/og";
import { ImageResponse } from "next/og";
import { appName } from "@/lib/shared";

// Default Open Graph image for the root pages (landing, roadmap, legal,
// open-source…). Pages that define their own `openGraph.images`
// (blog) or their own OG route (docs) are not affected.
// Same generator as the docs OG, adapted to the site's gold identity.

// Short tagline (the full description would overflow the OG visual).
const ogTagline = "Open Source Player graph — a social & feedback graph for gaming.";

export const alt = appName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
	return new ImageResponse(
		(
			<DefaultImage
				title={appName}
				description={ogTagline}
				site={appName}
				primaryColor="#ffd32a"
				primaryTextColor="#ffd32a"
				icon={
					// Gold diamond — brand motif from the landing (square rotated 45°).
					<div
						style={{
							width: 34,
							height: 34,
							background: "#ffd32a",
							transform: "rotate(45deg)",
						}}
					/>
				}
			/>
		),
		{ ...size },
	);
}
