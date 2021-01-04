import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";
import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/esm/selectable";
import type { SelectionType } from "../../common/hoc";
import type { ItemContext } from ".";

export const [
	createMenuContext,
	getMenuContext,
] = createContextStore<MenuContext>();

export interface MenuContext {
	open: boolean;
	group: SelectionGroupBinding;
	selectionType: SelectionType;
	registerItem(item: ItemContext): void;
	unregisterItem(item: ItemContext): void;
	reinitialize(): void;
}
