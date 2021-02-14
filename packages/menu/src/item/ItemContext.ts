import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";

export const [
	createItemContext,
	getItemContext,
] = createContextStore<ItemContext>();

export interface ItemContext {
	selected: boolean;
	value: string;
	dom: HTMLLIElement;
}
