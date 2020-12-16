import { ItemContext } from "..";

export interface OnMenuImplSelect {
	itemDom: HTMLLIElement;
	itemValue: string;
	itemIndex: number;
	dom: HTMLDivElement;
	item: ItemContext;
}
