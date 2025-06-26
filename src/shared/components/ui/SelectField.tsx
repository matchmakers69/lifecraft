type Value = {
	label: string;
	value: string | number;
};
type Option = string | number | Value;

type SelectFieldProps<T extends Option> = {
	label: string;
	options: T[];
	value: string | number;
	onChange: (value: string | number) => void;
	id?: string;
	name?: string;
	className?: string;
	displayEmpty?: boolean;
	emptyLabel?: string;
};

const getOptionLabel = (option: Option): string => {
	if (typeof option === "object") return option.label;
	return String(option);
};

const getOptionValue = (option: Option): string | number => {
	if (typeof option === "object") return option.value;
	return option;
};

const SelectField = <T extends Option>({
	label,
	options,
	value,
	onChange,
	id,
	name,
	className = "",
	displayEmpty = false,
	emptyLabel = "Please select...",
}: SelectFieldProps<T>) => {
	const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, "-")}`;

	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={selectId} className="text-sm font-medium block mb-2 text-white">
				{label}
			</label>
			<select
				id={selectId}
				name={name}
				className={`block px-4 py-5 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
				value={value}
				onChange={(e) => {
					const val = e.target.value;
					const original = options.find((opt) => String(getOptionValue(opt)) === val);
					onChange(original !== undefined ? getOptionValue(original) : val);
				}}
			>
				{displayEmpty && (
					<option value="" disabled>
						{emptyLabel}
					</option>
				)}
				{options.map((opt, index) => (
					<option key={index} value={getOptionValue(opt)}>
						{getOptionLabel(opt)}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectField;
