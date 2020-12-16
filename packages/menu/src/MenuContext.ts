import { createContextBuilder } from "../../../packages/common";
import { SelectionGroupBinding } from "../../../packages/common/selectable";
import { SelectionType } from "../../../packages/common/hoc";
import { ItemContext } from ".";

export const [
	createMenuContext,
	getMenuContext,
] = createContextBuilder<MenuContext>();

export interface MenuContext {
	open: boolean;
	group: SelectionGroupBinding;
	selectionType: SelectionType;
	registerItem(item: ItemContext): void;
	unregisterItem(item: ItemContext): void;
	reinitialize(): void;
}
