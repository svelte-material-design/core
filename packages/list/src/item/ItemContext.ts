import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";

export const [
	setItemContext,
	getItemContext,
] = createContextStore<ItemContext>();

export interface ItemContext {
	dom: HTMLLIElement | HTMLAnchorElement;
	selected: boolean;
	disabled: boolean;
	tabindex: number;
	setTabIndex(tabindex: number): void;
}
