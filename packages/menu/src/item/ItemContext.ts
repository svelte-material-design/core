import { createContextBuilder } from "../../../common";

export const [
	createItemContext,
	getItemContext,
] = createContextBuilder<ItemContext>();

export interface ItemContext {
	setSelected(selected: boolean): void;
	notifySelection(): void;
	selected: boolean;
	value: string;
	dom: HTMLLIElement;
}
