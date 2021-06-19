import type { A, Div, Li } from "../../../../common/dom";

export type ListItemComponent = typeof Li | typeof Div | typeof A;
export type ListItemElement =
	| HTMLLIElement
	| HTMLDivElement
	| HTMLAnchorElement;
