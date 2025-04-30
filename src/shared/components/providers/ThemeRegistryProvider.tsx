"use client";

import { ReactNode } from "react";
import { emotionCache } from "@/utils";
import { CacheProvider } from "@emotion/react";

const clientSideEmotionCache = emotionCache();

function ThemeRegistryProvider({ children }: { children: ReactNode }) {
	return <CacheProvider value={clientSideEmotionCache}>{children}</CacheProvider>;
}

export { ThemeRegistryProvider };
