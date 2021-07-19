import { createContextWritableStore } from "@raythurnevoid/svelte-context-enhanced";

export const [setItemContext, getItemContext] =
	createContextWritableStore<ItemContext>();

export interface ItemContext {
	dom: HTMLLIElement;
	selected: boolean;
	value: string;
	disabled: boolean;
}
