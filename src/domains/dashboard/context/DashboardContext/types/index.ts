import { Dispatch } from "react";

export type DashboardInitState = {
	isSidebarInView: boolean;
};

export type ActionType =
	| { type: "TOGGLE_SIDEBAR"; payload: boolean }
	| {
			type: "CLOSE_SIDEBAR";
			payload: boolean;
	  };

export type DashboardInit = {
	isSidebarInView: boolean;
	dispatch: Dispatch<ActionType>;
};
