export type {
	MenuSurfaceAnchorMargin as MenuAnchorMargin,
	MenuSurfaceAbsolutePosition as MenuAbsolutePosition,
	MenuSurfaceVariant as MenuVariant,
	MenuSurfaceAnchorCorner as MenuAnchorCorner,
	MenuSurfaceAnchor as MenuAnchor,
} from "../../menu-surface/src/types";
export type { MDCMenuDistance } from "@material/menu-surface";
export type { SelectionType as MenuSelectionType } from "@raythurnevoid/svelte-group-components/ts/selectable";
export type {
	ListOrientation as MenuOrientation,
	ListItemsStyle as MenuItemsStyle,
} from "../../list/src/types";

export interface OnMenuChildrenChangeEvent {
	dom: HTMLDivElement;
	items: HTMLLIElement[];
}
export interface OnMenuChangeEvent {
	dom: HTMLDivElement;
	value: string | string[];
}

export interface OnMenuSelect {
	dom: HTMLDivElement;
	itemIndex: number;
	itemDom: HTMLLIElement;
	value: string;
}

export type MenuValue = string | string[];
