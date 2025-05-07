"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSessionWithUpdate } from "../../hooks";
import { logout } from "@/app/(root)/(authentication)/auth/_actions";
import { paths } from "@/constants";
import { Button } from "@/shared/components/ui";

export const LogoutUserButton = () => {
	const { update } = useSessionWithUpdate();
	const router = useRouter();

	const handleLogout = async () => {
		await logout();
		await update();
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

			<span className="ml-3 inline-block">Logout</span>
		</Button>
	);
};
