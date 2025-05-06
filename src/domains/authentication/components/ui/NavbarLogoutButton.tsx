"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { paths } from "@/constants";
import { Button } from "@/shared/components/ui";
import { t } from "@/shared/locales";

const NavbarLogoutButton = () => {
	const router = useRouter();

	const handleLogout = async () => {
		await signOut({ redirect: false });
		router.push(paths.login());
	};

	return (
		<Button
			className="border-[hsla(0,0%,100%,0.1)] text-[rgba(var(--white),1)]"
			onClick={handleLogout}
			type="button"
			size="sm"
			variant="outline"
		>
			<LogOut className="hover:text-navy size-6" />
			<span className="ml-3 inline-block">{t.auth.logout.signOut}</span>
		</Button>
	);
};

export { NavbarLogoutButton };
