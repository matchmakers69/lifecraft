import { useMemo, useState } from "react";

type Setter<T> = T | (() => T);

const useToggle = (defaultState: Setter<boolean> = false) => {
	const [initState] = useState(defaultState);
	const [isOn, setIsOn] = useState(initState);
	return useMemo(
		() => ({
			isOn,
			isOff: !isOn,
			set: setIsOn,
			on: () => setIsOn(true),
			off: () => setIsOn(false),
			toggle: () => setIsOn((prevState) => !prevState),
			reset: () => setIsOn(initState),
		}),
		[initState, isOn],
	);
};

export { useToggle };
