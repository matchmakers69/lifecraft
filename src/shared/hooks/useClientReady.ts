import { useEffect, useState } from "react";

export const useClientReady = () => {
	const [clientReady, setClientReady] = useState(false);

	useEffect(() => {
		setClientReady(true);
	}, []);

	return {
		clientReady,
	};
};
