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

export type InputFieldCustomValidation = (
	value: any,
	nativeInputInvalid: boolean
) => boolean;

export interface OnInputFieldInput {
	dom: HTMLDivElement;
	value: string | number | Date;
}

export interface OnInputFieldChange extends OnInputFieldInput {}

export type Value = string | number | Date;
