"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { BaseProps } from "@/shared/types";

export type SessionProviderProps = BaseProps;

const SessionProvider = ({ children }: SessionProviderProps) => {
	return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};

export { SessionProvider };
