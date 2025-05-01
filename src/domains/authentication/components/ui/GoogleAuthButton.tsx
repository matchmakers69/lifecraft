"use client";

import { Button } from "@/shared/components/ui";
import { SocialButtonsText, SocialProviders } from "../../types";
import { login } from "@/app/(root)/(authentication)/auth/_actions";

const GoogleAuthButton = ({ text = "Login with Google" }: SocialButtonsText) => {
	const handleLogin = (provider: SocialProviders) => {
		login(provider);
	};
	return (
		<>
			<Button size="sm" className="google-button" variant="social" onClick={() => handleLogin("google")}>
				<i className="ri-google-fill text-[2rem]" />
				<span className="ml-3 block">{text}</span>
			</Button>
		</>
	);
};

export { GoogleAuthButton };
