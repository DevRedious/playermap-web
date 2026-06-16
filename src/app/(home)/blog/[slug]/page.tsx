/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ShareButton } from "@/components/share-button";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";

export function generateStaticParams() {
	return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = getPost(slug);
	if (!post) return {};

	// Share image: the post cover if present, otherwise a default brand image.
	// metadataBase (layout) resolves the relative URL into an absolute one.
	const ogImage = post.image ?? "/img/blog/playermap_background.jpg";

	return {
		title: post.title,
		description: post.description,
		openGraph: {
			type: "article",
			title: post.title,
			description: post.description,
			url: `/blog/${post.slug}`,
			publishedTime: post.date,
			authors: post.author ? [post.author.name] : undefined,
			images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
			images: [ogImage],
		},
	};
}

export default async function PostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = getPost(slug);
	if (!post) notFound();

	return (
		<main className="mx-auto w-full max-w-3xl px-6 py-16">
			<Link
				href="/blog"
				className="text-sm text-white/50 transition-colors hover:text-brand"
			>
				← Back to blog
			</Link>

			<h1 className="mt-6 text-3xl font-bold text-brand md:text-4xl">
				{post.title}
			</h1>

			<div className="mt-3 flex items-center justify-between gap-4">
				<div className="flex items-center gap-2 text-sm text-white/40">
					{post.author?.avatar && (
						<img
							src={post.author.avatar}
							alt=""
							className="h-6 w-6 rounded-full"
						/>
					)}
					{post.author && <span>{post.author.name}</span>}
					{post.author && <span>·</span>}
					<span>{formatDate(post.date)}</span>
				</div>
				<ShareButton title={post.title} />
			</div>

			{post.image && (
				<div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10">
					<Image
						src={post.image}
						alt=""
						fill
						priority
						sizes="(min-width: 768px) 768px, 100vw"
						className="object-cover"
					/>
				</div>
			)}

			<div className="prose prose-invert mt-8 max-w-none prose-headings:text-white prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-blockquote:border-brand prose-blockquote:text-white/80">
				<Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
			</div>
		</main>
	);
}
