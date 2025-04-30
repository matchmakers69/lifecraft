"use client";

import { ReactNode } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressBarProvider = ({ children }: { children: ReactNode }) => {
	return (
		<>
			{children}
			<ProgressBar height="2px" color="#4a5e95" options={{ showSpinner: false }} shallowRouting />
		</>
	);
};

export { ProgressBarProvider };
