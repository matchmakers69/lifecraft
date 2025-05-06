import { HeaderAuth } from "@/domains/authentication/components/ui";
import { Navigation, Header } from ".";

const Navbar = () => {
	return (
		<Header>
			<div className="right-nav flex items-center">
				<Navigation />
				<HeaderAuth />
			</div>
		</Header>
	);
};

export { Navbar };
