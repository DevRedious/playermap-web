import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	images: {
		// AVIF d'abord (plus léger), WebP en repli.
		formats: ["image/avif", "image/webp"],
	},
};

export default withMDX(config);
