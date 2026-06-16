import { BlogList } from "@/components/blog-list";
import { getPostsPage } from "@/lib/blog";

export const metadata = {
	title: "Blog",
	description: "News and updates from the Player Map team.",
};

export default function BlogIndex() {
	const { posts, page, totalPages } = getPostsPage(1);
	return <BlogList posts={posts} page={page} totalPages={totalPages} />;
}
