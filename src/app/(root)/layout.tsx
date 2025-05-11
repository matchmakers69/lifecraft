import type { Metadata } from "next";
import "remixicon/fonts/remixicon.css";
import "@/styles/globals.css";
import { fontsClassName } from "@/utils";
import {
	LocalizationProvider,
	ProgressBarProvider,
	SessionProvider,
	ThemeRegistryProvider,
	ToasterProvider,
} from "@/shared/components/providers";

export const metadata: Metadata = {
	title: "Lifecraft app",
	description: "This is lifecraft description",
	keywords: [
		"portfolio",
		"web developer",
		"web",
		"web dev",
		"developer",
		"PROGRAMMER ",
		"programmer ",
		"Przemek Lewtak",
	],
	authors: [
		{
			name: "Przemek Lewtak",
			url: "https://github.com/matchmakers69",
		},
	],
	creator: "Przemek Lewtak",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html suppressHydrationWarning lang="en">
			<body className={`${fontsClassName} body-app scroll-touch`}>
				<SessionProvider>
					<ThemeRegistryProvider>
						<ToasterProvider />
						<ProgressBarProvider>
							<LocalizationProvider>{children}</LocalizationProvider>
						</ProgressBarProvider>
					</ThemeRegistryProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
