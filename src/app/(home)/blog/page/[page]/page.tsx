import { notFound, redirect } from "next/navigation";
import { BlogList } from "@/components/blog-list";
import { getAllPosts, getPostsPage, POSTS_PER_PAGE } from "@/lib/blog";

export function generateStaticParams() {
	const total = Math.max(1, Math.ceil(getAllPosts().length / POSTS_PER_PAGE));
	// Pages 2..total — page 1 is served by /blog
	return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({
		page: String(i + 2),
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ page: string }>;
}) {
	const { page } = await params;
	return { title: `Blog — Page ${page}` };
}

export default async function BlogPaged({
	params,
}: {
	params: Promise<{ page: string }>;
}) {
	const { page } = await params;
	const n = Number(page);
	if (!Number.isInteger(n) || n < 1) notFound();
	if (n === 1) redirect("/blog");

	const { posts, page: current, totalPages } = getPostsPage(n);
	if (n > totalPages) notFound();

	return <BlogList posts={posts} page={current} totalPages={totalPages} />;
}
