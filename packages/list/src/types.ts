export type ListItemDOMElement =
	| HTMLLIElement
	| HTMLAnchorElement
	| HTMLSpanElement;

export type ItemRole = "radio" | "checkbox" | "menuitem" | "option";
export type ListRole = "listbox" | "radiogroup" | "group" | "list" | "menu";

export interface OnListChangeEvent {
	value: string | string[];
	dom: HTMLDivElement | HTMLUListElement;
}
