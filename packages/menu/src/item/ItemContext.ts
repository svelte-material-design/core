import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";

export const [
	createItemContext,
	getItemContext,
] = createContextStore<ItemContext>();

export interface ItemContext {
	setSelected(selected: boolean): void;
	notifySelection(): void;
	selected: boolean;
	value: string;
	dom: HTMLLIElement;
}
