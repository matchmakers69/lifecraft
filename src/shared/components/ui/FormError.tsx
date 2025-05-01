const FormError = ({ message }: { message: string }) => {
	if (!message) return null;

	return (
		<div className="flex items-center gap-x-2 rounded-md bg-destructive-foreground px-6 py-3 text-sm text-destructive">
			<i className="ri-error-warning-line text-md" />
			<p aria-live="assertive" className="ml-2 font-semibold">
				{message}
			</p>
		</div>
	);
};
export { FormError };
