import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";
import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/selectable";
import type { GroupBindings } from "@raythurnevoid/svelte-group-components";
import type { SelectionType } from "../../common/hoc";

export const [createMenuContext, getMenuContext] =
	createContextStore<MenuContext>();

export interface MenuContext {
	open: boolean;
	menuGroup: GroupBindings;
	selectionGroup: SelectionGroupBinding;
	selectionType: SelectionType;
	reinitialize(): void;
}
