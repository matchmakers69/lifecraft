import { Bebas_Neue, Oswald, IBM_Plex_Sans_Condensed } from "next/font/google";

const BebasFont = Bebas_Neue({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-bebas",
	weight: ["400"],
});

const IbmFont = IBM_Plex_Sans_Condensed({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-ibm",
	weight: ["300", "400", "500", "600"],
});

const OswaldFont = Oswald({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-oswald",
	weight: ["600", "700"],
});

const fonts = [BebasFont, IbmFont, OswaldFont];
export const fontsClassName = fonts.map((font) => font.variable).join(" ");
