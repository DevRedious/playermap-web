import fs from "node:fs";
import path from "node:path";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function readLegal(slug: string) {
	const file = path.join(
		process.cwd(),
		"src",
		"content",
		"legal",
		`${slug}.md`,
	);
	const raw = fs.readFileSync(file, "utf8");

	// Minimal frontmatter: ---\ntitle: ...\n---
	let title = slug;
	let body = raw;
	const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
	if (fm) {
		body = raw.slice(fm[0].length);
		const t = fm[1].match(/title:\s*(.+)/);
		if (t) title = t[1].trim();
	}
	return { title, body };
}

export function getLegalTitle(slug: string): string {
	return readLegal(slug).title;
}

/** Renders a legal page in markdown (prose style, dark theme + golden links). */
export function MarkdownPage({ slug }: { slug: string }) {
	const { title, body } = readLegal(slug);

	return (
		<main className="mx-auto w-full max-w-3xl px-6 py-16">
			<h1 className="text-3xl font-bold text-brand md:text-4xl">{title}</h1>
			<div className="prose prose-invert mt-8 max-w-none prose-headings:text-white prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-hr:border-white/10">
				<Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
			</div>
		</main>
	);
}
