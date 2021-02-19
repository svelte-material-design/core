import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";
import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";
import type { GroupBindings } from "@raythurnevoid/svelte-group-components/ts";
import type { SelectionType } from "../../common/hoc";
import type { ItemContext } from ".";

export const [
	createMenuContext,
	getMenuContext,
] = createContextStore<MenuContext>();

export interface MenuContext {
	open: boolean;
	group: GroupBindings;
	selectionGroup: SelectionGroupBinding;
	selectionType: SelectionType;
	registerItem(item: ItemContext): void;
	unregisterItem(item: ItemContext): void;
	reinitialize(): void;
}
