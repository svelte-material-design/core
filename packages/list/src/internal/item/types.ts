import type { A, Div } from "../../../../common/dom";

export type ListItemComponent = typeof Div | typeof A;
export type ListItemElement =
	| HTMLLIElement
	| HTMLDivElement
	| HTMLAnchorElement;
