export type ItemRole = "radio" | "checkbox" | "option";
export type ListRole = "radiogroup" | "group" | "list";
export type ListOrientation = "vertical" | "horizontal";

export interface OnListChildrenChangeEvent {
	items: HTMLLIElement[];
}
export interface OnListChangeEvent {
	dom: HTMLUListElement;
	value: ListValue;
}

export type { SelectionType as ListSelectionType } from "@raythurnevoid/svelte-group-components/ts/selectable";

export type ListItemsStyle =
	| "textual"
	| "avatar"
	| "icon"
	| "image"
	| "thumbnail"
	| "video";

export type ListValue = string | string[];
