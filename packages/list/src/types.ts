export type ItemRole = "radio" | "checkbox" | "option";
export type ListRole = "radiogroup" | "group" | "list";
export type ListOrientation = "vertical" | "horizontal";

export interface OnListChangeEvent {
	value: ListValue;
}

export type ListItemsStyle =
	| "textual"
	| "avatar"
	| "icon"
	| "image"
	| "thumbnail"
	| "video";

export type ListValue = string | string[];
