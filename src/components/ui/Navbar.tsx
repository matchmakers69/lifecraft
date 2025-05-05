import { HeaderAuth, Navigation, Header } from ".";

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
