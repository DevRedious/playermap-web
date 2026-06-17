import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type Author = {
	name: string;
	title?: string;
	url?: string;
	avatar?: string;
};

/** Authors (ported from blog/authors.yml). Add an entry for a new author. */
export const authors: Record<string, Author> = {
	omiage: {
		name: "Omiage",
		title: "Agent Co-Founder",
		url: "https://www.linkedin.com/in/sratton",
		avatar: "https://www.stevenratton.com/images/avatar.svg",
	},
};

export type Post = {
	slug: string;
	title: string;
	description?: string;
	date: string; // 'YYYY-MM-DD'
	image?: string;
	/** Natural pixel size of `image`, read from the file so it renders uncropped. */
	imageWidth?: number;
	imageHeight?: number;
	author?: Author;
	content: string;
};

/** Read the intrinsic dimensions of a JPEG/PNG that lives under /public. */
function getImageSize(
	publicPath: string,
): { width: number; height: number } | undefined {
	try {
		const file = path.join(process.cwd(), "public", publicPath);
		const buf = fs.readFileSync(file);

		// PNG: 16-byte signature + IHDR width/height as big-endian uint32.
		if (buf.length > 24 && buf.toString("ascii", 12, 16) === "IHDR") {
			return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
		}

		// JPEG: walk segments until a Start-Of-Frame marker (SOF0–SOF3).
		if (buf[0] === 0xff && buf[1] === 0xd8) {
			let off = 2;
			while (off < buf.length) {
				if (buf[off] !== 0xff) {
					off++;
					continue;
				}
				const marker = buf[off + 1];
				if (marker >= 0xc0 && marker <= 0xc3) {
					return {
						height: buf.readUInt16BE(off + 5),
						width: buf.readUInt16BE(off + 7),
					};
				}
				off += 2 + buf.readUInt16BE(off + 2);
			}
		}
	} catch {
		// Missing or unreadable file: fall back to no dimensions.
	}
	return undefined;
}

function normalizeDate(value: unknown): string {
	if (value instanceof Date) return value.toISOString().slice(0, 10);
	return String(value ?? "");
}

function readPostFile(file: string): Post {
	const slug = file.replace(/\.mdx?$/, "");
	const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
	const { data, content } = matter(raw);
	const authorKey = typeof data.author === "string" ? data.author : undefined;
	const image = typeof data.image === "string" ? data.image : undefined;
	const size = image ? getImageSize(image) : undefined;
	return {
		slug,
		title: typeof data.title === "string" ? data.title : slug,
		description:
			typeof data.description === "string" ? data.description : undefined,
		date: normalizeDate(data.date),
		image,
		imageWidth: size?.width,
		imageHeight: size?.height,
		author: authorKey ? authors[authorKey] : undefined,
		content,
	};
}

export function getAllPosts(): Post[] {
	if (!fs.existsSync(BLOG_DIR)) return [];
	return fs
		.readdirSync(BLOG_DIR)
		.filter((f) => /\.mdx?$/.test(f))
		.map(readPostFile)
		.sort((a, b) => (a.date < b.date ? 1 : -1)); // most recent first
}

export function getPost(slug: string): Post | null {
	for (const ext of [".md", ".mdx"]) {
		if (fs.existsSync(path.join(BLOG_DIR, `${slug}${ext}`))) {
			return readPostFile(`${slug}${ext}`);
		}
	}
	return null;
}

const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export function formatDate(date: string): string {
	const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(date);
	if (!m) return date;
	return `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}`;
}

/** Number of posts per page in the blog list. */
export const POSTS_PER_PAGE = 6;

export type PostsPage = {
	posts: Post[];
	page: number;
	totalPages: number;
};

/** Returns the slice of posts for a given page (1-indexed). */
export function getPostsPage(page: number): PostsPage {
	const all = getAllPosts();
	const totalPages = Math.max(1, Math.ceil(all.length / POSTS_PER_PAGE));
	const current = Math.min(Math.max(1, Math.floor(page) || 1), totalPages);
	const start = (current - 1) * POSTS_PER_PAGE;
	return {
		posts: all.slice(start, start + POSTS_PER_PAGE),
		page: current,
		totalPages,
	};
}
