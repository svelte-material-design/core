export type ItemRole = "radio" | "checkbox" | "option";
export type ListRole = "radiogroup" | "group" | "list";
export type ListOrientation = "vertical" | "horizontal";

export interface OnListChangeEvent {
	value: string | string[];
}

export type ListType =
	| "textual"
	| "avatar"
	| "icon"
	| "image"
	| "thumbnail"
	| "video";
