import { v4 as uuidv4 } from "uuid";
import { paths } from "./paths";

const navigation = [
	{
		id: uuidv4(),
		url: paths.home(),
		linkLabel: "Home",
	},
	{
		id: uuidv4(),
		url: paths.settings(),
		linkLabel: "Settings",
	},
	{
		id: uuidv4(),
		url: paths.adminDashboard(),
		linkLabel: "Admin",
	},
];

export { navigation };
