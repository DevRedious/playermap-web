/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { formatDate, type Post } from "@/lib/blog";

function pageHref(p: number) {
	return p === 1 ? "/blog" : `/blog/page/${p}`;
}

/**
 * List of pagination items. ≤ 7 pages → all numbers ; beyond that →
 * first + last + a window around the current page, with « … ».
 */
function paginationItems(page: number, total: number): (number | "ellipsis")[] {
	if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
	const items: (number | "ellipsis")[] = [1];
	const left = Math.max(2, page - 1);
	const right = Math.min(total - 1, page + 1);
	if (left > 2) items.push("ellipsis");
	for (let i = left; i <= right; i++) items.push(i);
	if (right < total - 1) items.push("ellipsis");
	items.push(total);
	return items;
}

function Pagination({
	page,
	totalPages,
}: {
	page: number;
	totalPages: number;
}) {
	if (totalPages <= 1) return null;

	const items = paginationItems(page, totalPages);
	const base =
		"inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm transition-colors";

	return (
		<nav
			aria-label="Blog pagination"
			className="mt-12 flex items-center justify-center gap-2"
		>
			{page > 1 ? (
				<Link
					href={pageHref(page - 1)}
					className={`${base} border-white/15 text-white/70 hover:border-brand hover:text-brand`}
				>
					← Prev
				</Link>
			) : (
				<span className={`${base} border-white/10 text-white/25`}>← Prev</span>
			)}

			{items.map((it, i) =>
				it === "ellipsis" ? (
					<span
						key={`ellipsis-after-${items[i - 1] ?? "start"}`}
						className="inline-flex h-9 min-w-9 items-center justify-center px-1 text-sm text-white/30"
					>
						…
					</span>
				) : (
					<Link
						key={it}
						href={pageHref(it)}
						aria-current={it === page ? "page" : undefined}
						className={
							it === page
								? `${base} border-brand bg-brand font-bold text-black`
								: `${base} border-white/15 text-white/70 hover:border-brand hover:text-brand`
						}
					>
						{it}
					</Link>
				),
			)}

			{page < totalPages ? (
				<Link
					href={pageHref(page + 1)}
					className={`${base} border-white/15 text-white/70 hover:border-brand hover:text-brand`}
				>
					Next →
				</Link>
			) : (
				<span className={`${base} border-white/10 text-white/25`}>Next →</span>
			)}
		</nav>
	);
}

export function BlogList({
	posts,
	page,
	totalPages,
}: {
	posts: Post[];
	page: number;
	totalPages: number;
}) {
	return (
		<main className="mx-auto w-full max-w-5xl px-6 py-16">
			<h1 className="text-3xl font-bold text-brand md:text-4xl">Blog</h1>
			<p className="mt-2 text-white/60">
				News and updates from the Player Map team.
			</p>

			<div className="mt-10 grid gap-6 sm:grid-cols-2">
				{posts.map((p) => (
					<Link
						key={p.slug}
						href={`/blog/${p.slug}`}
						className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:border-brand/40"
					>
						{p.image ? (
							<div className="relative h-44 w-full">
								<Image
									src={p.image}
									alt=""
									fill
									sizes="(min-width: 640px) 50vw, 100vw"
									className="object-cover"
								/>
							</div>
						) : (
							<div className="flex h-44 w-full items-center justify-center bg-black">
								<img
									src="/img/agent-dark.svg"
									alt=""
									className="h-16 opacity-40"
								/>
							</div>
						)}
						<div className="flex flex-1 flex-col p-5">
							<div className="text-xs text-white/40">
								{formatDate(p.date)}
								{p.author ? ` · ${p.author.name}` : ""}
							</div>
							<h2 className="mt-2 text-lg font-bold text-white transition-colors group-hover:text-brand">
								{p.title}
							</h2>
							<p className="mt-2 line-clamp-3 text-sm text-white/60">
								{p.description}
							</p>
							<span className="mt-4 text-sm font-semibold text-brand">
								Read more →
							</span>
						</div>
					</Link>
				))}
			</div>

			<Pagination page={page} totalPages={totalPages} />
		</main>
	);
}
