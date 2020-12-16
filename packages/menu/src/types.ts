export { MenuSurfaceAnchorCorner as MenuAnchorCorner } from "../../../packages/menu-surface";
export { MenuSurfaceVariant as MenuVariant } from "../../../packages/menu-surface";
export {
	ListOrientation as MenuOrientation,
	ListType as MenuListType,
} from "../../../packages/list";
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
