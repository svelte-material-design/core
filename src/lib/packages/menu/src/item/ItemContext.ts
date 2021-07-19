import { createContextWritableStore } from "@raythurnevoid/svelte-context-enhanced";

export const [setItemContext, getItemContext] =
	createContextWritableStore<ItemContext>();

export interface ItemContext {
	disabled: boolean;
	selected: boolean;
	value: string;
	dom: HTMLLIElement;
}
