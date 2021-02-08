import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";

export const [
	setItemContext,
	getItemContext,
] = createContextStore<ItemContext>();

export interface ItemContext {
	dom: HTMLLIElement | HTMLAnchorElement;
	selected: boolean;
	value: string;
	disabled: boolean;
}
