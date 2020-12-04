import {
	createContextBuilder,
	createContextPropBuilder,
} from "../../../../packages/common";

const [createItemContext, getItemContext] = createContextBuilder<ItemContext>();
export { createItemContext, getItemContext };

export interface ItemContext {
	dom: HTMLLIElement | HTMLAnchorElement;
	selected: boolean;
	disabled: boolean;
	tabindex: number;
	setTabIndex(tabindex: number): void;
}

export const [
	setIsSelectionGroup,
	getIsSelectionGroup,
] = createContextPropBuilder<boolean>();
