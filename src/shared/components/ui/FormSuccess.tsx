export const FormSuccess = ({ message }: { message: string }) => {
	if (!message) return null;

	return (
		<div className="mb-8 flex items-center bg-spinach-green px-6 py-3 text-sm text-success">
			<i className="ri-checkbox-circle-line font-md" />
			<p aria-live="polite" className="ml-2 font-semibold text-white">
				{message}
			</p>
		</div>
	);
};
