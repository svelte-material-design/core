export type { GraphicDOM as IconDOM } from "../../common/components";

export type TabElement = HTMLButtonElement | HTMLAnchorElement;

export interface OnTabChange {
	dom: TabElement;
	selected: boolean;
}
