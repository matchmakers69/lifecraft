"use client";

import { SelectField } from "@/shared/components/ui";
import { CurrencyRate } from "../types";

type CurrencySelectorProps = {
	currencies: Record<string, CurrencyRate>;
	selectedCurrency: string;
	onSelectCurrency: (value: string | number) => void;
};

const CurrencySelector = ({ currencies, selectedCurrency, onSelectCurrency }: CurrencySelectorProps) => {
	const countryCodes = Object.keys(currencies).map((code) => code);

	return (
		<SelectField
			label="Your selected currency"
			displayEmpty
			emptyLabel="Select a currency"
			options={countryCodes ?? []}
			value={selectedCurrency}
			onChange={onSelectCurrency}
		/>
	);
};

export default CurrencySelector;
