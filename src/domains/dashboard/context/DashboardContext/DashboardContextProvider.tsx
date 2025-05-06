"use client";

import { createContext, useContext, useMemo, useReducer } from "react";
import { DashboardInit, DashboardInitState } from "./types";
import { BaseProps } from "@/shared/types";
import { reducer } from "./reducer";

const DashboardContext = createContext<DashboardInit | null>(null);

const useDashboardContext = () => {
	const context = useContext(DashboardContext);
	if (!context) {
		throw new Error("Please make sure you wrapped by Provider");
	}
	return context;
};

const initState: DashboardInitState = {
	isSidebarInView: false,
};

const DashboardContextProvider = ({ children }: BaseProps) => {
	const [state, dispatch] = useReducer(reducer, initState);
	const value = useMemo(
		() => ({
			...state,
			dispatch,
		}),
		[state],
	);
	return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export { DashboardContextProvider, useDashboardContext };
