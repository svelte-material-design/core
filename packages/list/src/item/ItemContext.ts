import {
	createContextBuilder,
	createContextPropBuilder,
} from "../../../common";

const [createItemContext, getItemContext] = createContextBuilder<ItemContext>();
export { createItemContext, getItemContext };

export interface ItemContext {
	dom: HTMLLIElement | HTMLAnchorElement;
	selected: boolean;
	disabled: boolean;
	tabindex: number;
	setTabIndex(tabindex: number): void;
}
