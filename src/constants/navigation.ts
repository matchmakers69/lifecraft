import { v4 as uuidv4 } from "uuid";
import { paths } from "./paths";
import { t } from "@/shared/locales";

const navigation = [
	{
		id: uuidv4(),
		url: paths.home(),
		linkLabel: `${t.navigationLinks.home}`,
	},
	{
		id: uuidv4(),
		url: paths.adminDashboard(),
		linkLabel: `${t.navigationLinks.admin}`,
	},
];

export { navigation };
