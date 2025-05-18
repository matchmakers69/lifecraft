"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { GRAVATAR_URL, paths } from "@/constants";
import { Button } from "@/shared/components/ui";
import { useSessionWithUpdate } from "@/domains/authentication/hooks";
import { NavbarLogoutButton } from "@/domains/authentication/components/ui";
import { NavLink } from "@/components/ui";
import { t } from "@/shared/locales";

const HeaderAuth = () => {
	const { session } = useSessionWithUpdate();
	let authContent: ReactNode;

	if (session && session?.user) {
		const userName = session?.user.name ?? "Username";
		const avatarSrc = session?.user.image ?? GRAVATAR_URL;

		authContent = (
			<div className="flex items-center gap-6">
				<p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">{userName}</p>

				<Link className="block h-[30px] w-[30px]" href={paths.account()}>
					<Image alt="User avatar" src={avatarSrc} width="30" height="30" className="rounded-full" />
				</Link>
				<NavLink
					className="relative flex h-[42px] max-w-full cursor-pointer select-none items-center justify-start gap-[10px] rounded-[10px] border border-solid border-[hsla(0,0%,100%,0.1)] bg-transparent px-[15px] py-[10px] text-sm text-light-grey transition-all duration-200 ease-out md:hover:bg-[#ffffff13] md:hover:text-text-light"
					classNameActive="text-primary bg-[#ffffff0d]"
					href={paths.settings()}
				>
					<i className={`ri-settings-2-line`} />
					<span className="text-inherit">{t.navigationLinks.settings}</span>
				</NavLink>
				<NavbarLogoutButton />
			</div>
		);
	} else {
		authContent = (
			<div className="flex items-center gap-6">
				<Button
					className="hover:bg-dark-blue rounded-lg bg-text-light text-black hover:text-black"
					asChild
					variant="link"
					size="sm"
				>
					<Link href={paths.login()}>Sign in</Link>
				</Button>

				<Button
					className="bg-dark-blue rounded-lg text-black hover:bg-text-light hover:text-black"
					asChild
					variant="link"
					size="sm"
				>
					<Link href={paths.register()}>Sign up</Link>
				</Button>
			</div>
		);
	}

	return authContent;
};

export { HeaderAuth };
