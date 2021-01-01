export { MenuSurfaceAnchorCorner as MenuAnchorCorner } from "../../menu-surface";
export { MenuSurfaceVariant as MenuVariant } from "../../menu-surface";
export {
	ListOrientation as MenuOrientation,
	ListType as MenuListType,
} from "../../list";
export { MDCMenuDistance } from "@material/menu-surface";

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
