import { ActionType, DashboardInitState } from "./types";

export const reducer = (state: DashboardInitState, action: ActionType) => {
	switch (action.type) {
		case "TOGGLE_SIDEBAR":
			return {
				...state,
				isSidebarInView: action.payload,
			};
		case "CLOSE_SIDEBAR":
			return {
				...state,
				isSideBarInView: action.payload,
			};
		default:
			return state;
	}
};
