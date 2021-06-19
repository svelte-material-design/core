import type { Ol, Ul, A, Div, Li } from "../../common/dom";

export type ListComponent = typeof Ul | typeof Ol;
export type ListElement = HTMLUListElement | HTMLOListElement;

export type ListOrientation = "vertical" | "horizontal";

export interface OnListActionEvent {
	dom: ListElement;
	itemIndex: number;
	itemDom: HTMLLIElement;
	value: string;
}

export interface OnListChildrenChangeEvent {
	dom: ListElement;
	items: HTMLLIElement[];
}

export interface OnListChangeEvent {
	dom: HTMLUListElement;
	value: ListValue;
}

export type { SelectionType as ListSelectionType } from "@raythurnevoid/svelte-group-components/selectable";

export type ListItemsStyle =
	| "textual"
	| "avatar"
	| "icon"
	| "image"
	| "thumbnail"
	| "video";

export type ListValue = string | string[];
