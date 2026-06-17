export function SectionTitle({ children }: { children: React.ReactNode }) {
	return (
		<h2 className="text-center text-3xl font-extrabold uppercase tracking-wide text-brand md:text-4xl">
			{children}
		</h2>
	);
}
