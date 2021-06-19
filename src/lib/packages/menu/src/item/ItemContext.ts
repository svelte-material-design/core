import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";

export const [
	setItemContext,
	getItemContext,
] = createContextStore<ItemContext>();

export interface ItemContext {
	disabled: boolean;
	selected: boolean;
	value: string;
	dom: HTMLLIElement;
}
