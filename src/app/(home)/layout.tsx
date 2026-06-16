import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Footer } from "@/components/footer";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/">) {
	return (
		<HomeLayout {...baseOptions()}>
			{/* flex-1 pushes the footer to the bottom even on short pages (sticky footer) */}
			<div className="flex w-full flex-1 flex-col">{children}</div>
			<Footer />
		</HomeLayout>
	);
}
