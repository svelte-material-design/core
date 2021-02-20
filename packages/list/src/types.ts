export type ItemRole = "radio" | "checkbox" | "option";
export type ListRole = "radiogroup" | "group" | "list";
export type ListOrientation = "vertical" | "horizontal";

export interface OnListChildrenChangeEvent {
	dom: HTMLUListElement;
	items: HTMLLIElement[];
}
export interface OnListChangeEvent {
	dom: HTMLUListElement;
	value: ListValue;
}

export interface OnListActionEvent {
	dom: HTMLUListElement;
	itemIndex: number;
	itemDom: HTMLLIElement;
	value: string;
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
