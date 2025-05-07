import { v4 as uuidv4 } from "uuid";
import { t } from "@/shared/locales";

type SidebarChild = {
	id: string;
	label: string;
	href: string;
	icon: string;
};

type SidebarItem = {
	id: string;
	label: string;
	children?: SidebarChild[];
};

const sidebarNavigation: SidebarItem[] = [
	{
		id: uuidv4(),
		label: `${t.sidebarNavigationLinks.home}`,
	},
	{
		id: uuidv4(),
		label: `${t.sidebarNavigationLinks.settings}`,

	},
];

export { sidebarNavigation };
