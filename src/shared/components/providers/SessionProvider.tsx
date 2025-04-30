"use client";

import { ReactNode } from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

const SessionProvider = ({ children }: { children: ReactNode }) => {
	return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};

export { SessionProvider };
