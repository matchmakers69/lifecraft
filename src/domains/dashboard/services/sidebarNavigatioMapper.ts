import { paths, sidebarNavigation } from "@/constants";

const sidebarNavigationList = sidebarNavigation.map((navItem) => {
	let icon = "";
	let href = "#";
    const children = navItem.children ?? null;
	switch (navItem.label.toLowerCase()) {
		case "home":
			href = paths.home();
			icon = "home";
			break;
		case "settings":
			href = paths.settings();
			icon = "settings";
			break;
			case "account":
				href = paths.account();
				icon = "account-circle";
				break;

		default:
			break;
	}
	return {
		...navItem,
		icon,
		href: children ? "#" : href,
        children
	};
});

export { sidebarNavigationList };
