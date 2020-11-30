export type ItemRole = "radio" | "checkbox" | "menuitem" | "option";
export type ListRole = "radiogroup" | "group" | "list" | "menu";
export type ListOrientation = "vertical" | "horizontal";

export interface OnListChangeEvent {
	value: string | string[];
	dom: HTMLDivElement | HTMLUListElement;
}
