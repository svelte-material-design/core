export type { MenuSurfaceAnchorCorner as MenuAnchorCorner } from "../../menu-surface";
export type { MenuSurfaceVariant as MenuVariant } from "../../menu-surface";
export type { MenuSurfaceAnchorMargin as MenuAnchorMargin } from "../../menu-surface";
export type {
	ListOrientation as MenuOrientation,
	ListItemsStyle as MenuItemsStyle,
} from "../../list";
export type { MDCMenuDistance } from "@material/menu-surface";
export type { SelectionType as MenuSelectionType } from "@raythurnevoid/svelte-group-components/ts/selectable";

export interface OnMenuChildrenChangeEvent {
	items: HTMLLIElement[];
}
export interface OnMenuChangeEvent {
	value: string | string[];
	dom: HTMLDivElement;
}

export interface OnMenuItemSelectedEvent {
	itemDom: HTMLLIElement;
	itemValue: string;
	itemIndex: number;
	dom: HTMLDivElement;
}

export type MenuValue = string | string[];
