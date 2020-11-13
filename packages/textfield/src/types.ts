export type InputFieldVariant = "filled" | "outlined";

export type InputFieldType =
	| "text"
	| "number"
	| "email"
	| "search"
	| "tel"
	| "url"
	| "password"
	| "month"
	| "week"
	| "date"
	| "datetime-local"
	| "time";

export type FullWidthTextFieldType = "text" | "search";

export type InputFieldCustomValidation = (
	value: any,
	nativeInputInvalid: boolean
) => boolean;
