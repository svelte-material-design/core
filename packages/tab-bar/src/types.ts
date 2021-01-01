export { TabIndicatorTransition } from "../../../packages/tab-indicator";

export interface OnTabBarChange {
	dom: HTMLDivElement;
	active: string;
	index: number;
}

export interface OnTabChange {
	dom: HTMLButtonElement;
	key: string;
	active: boolean;
}
