export default function Loading() {
	return (
		<div
			className="flex min-h-[60vh] flex-1 items-center justify-center"
			role="status"
			aria-label="Loading"
		>
			<span className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-brand" />
			<span className="sr-only">Loading…</span>
		</div>
	);
}
