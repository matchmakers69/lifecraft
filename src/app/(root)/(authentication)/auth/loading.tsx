import { Loader2 } from "lucide-react";

const Loading = () => {
	return (
		<section className="py-24">
			<div className="container">
				<Loader2 size={30} className="mx-auto my-10 animate-spin" />
			</div>
		</section>
	);
};

export default Loading;
