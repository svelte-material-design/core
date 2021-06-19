import type { ButtonDOM as TabElement } from "../../button";
export type { TabElement };
export type { GraphicDOM as IconDOM } from "../../common/components";
export interface OnTabChange {
	dom: TabElement;
	selected: boolean;
}
