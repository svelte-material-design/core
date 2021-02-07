export type { MenuSurfaceAnchorCorner as MenuAnchorCorner } from "../../menu-surface";
export type { MenuSurfaceVariant as MenuVariant } from "../../menu-surface";
export type {
	ListOrientation as MenuOrientation,
	ListItemsStyle as MenuItemsStyle,
} from "../../list";
export type { MDCMenuDistance } from "@material/menu-surface";

export interface OnMenuChange {
	value: string;
	dom: HTMLDivElement;
}

export interface OnMenuItemSelectedEvent {
	itemDom: HTMLLIElement;
	itemValue: string;
	itemIndex: number;
	dom: HTMLDivElement;
}
