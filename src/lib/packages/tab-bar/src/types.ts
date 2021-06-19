import type { TabElement } from "../../tab/src/types";
export type { TabIndicatorTransition } from "../../tab-indicator/src/types";
export type { OnTabChange } from "../../tab/src/types";
export type { TabElement };

export interface OnTabBarChange {
	dom: HTMLDivElement;
	value: string;
}

export interface OnTabBarChildrenChange {
	dom: HTMLDivElement;
	items: TabElement[];
}
