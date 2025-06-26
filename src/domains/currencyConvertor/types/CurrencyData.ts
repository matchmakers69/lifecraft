export type CurrencyRate = {
	code: string;
	value: number;
};

export type CurrencyData = {
	meta?: {
		last_updated_at: string;
	};

	data: Record<string, CurrencyRate>;
};
