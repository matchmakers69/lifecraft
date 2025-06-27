"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type ReactQueryProviderProps = {
	children: ReactNode;
};

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						staleTime: 600000, // 10 minutes
						refetchOnReconnect: false,
						retry: 1,
					},
				},
			}),
	);
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
};

export default ReactQueryProvider;
