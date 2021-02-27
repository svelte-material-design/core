export type { MenuSurfaceAnchorCorner as MenuAnchorCorner } from "../../menu-surface";
export type { MenuSurfaceVariant as MenuVariant } from "../../menu-surface";
export type { MenuSurfaceAnchorMargin as MenuAnchorMargin } from "../../menu-surface";
export type { MenuSurfaceAbsolutePosition as MenuAbsolutePosition } from "../../menu-surface";
export type { MenuSurfaceAnchor as MenuAnchor } from "../../menu-surface";
export type {
	ListOrientation as MenuOrientation,
	ListItemsStyle as MenuItemsStyle,
} from "../../list";
export type { MDCMenuDistance } from "@material/menu-surface";
export type { SelectionType as MenuSelectionType } from "@raythurnevoid/svelte-group-components/ts/selectable";

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
