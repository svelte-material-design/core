import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";

const [createItemContext, getItemContext] = createContextStore<ItemContext>();
export { createItemContext, getItemContext };

export interface ItemContext {
	dom: HTMLLIElement | HTMLAnchorElement;
	selected: boolean;
	disabled: boolean;
	tabindex: number;
	setTabIndex(tabindex: number): void;
}
