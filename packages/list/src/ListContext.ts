import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";
import type { ItemContext } from "./item";
import type { SelectionType } from "../../common/hoc";
import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";
import type { GroupBindings } from "@raythurnevoid/svelte-group-components/ts/components-group";

const [createListContext, getListContext] = createContextStore<ListContext>();
export { createListContext, getListContext };

export interface ListContext {
	dom: HTMLDivElement | HTMLUListElement;
	listSelectionGroup: SelectionGroupBinding;
	listGroup: GroupBindings;
	selectionType: SelectionType;
	registerItem(item: ItemContext): void;
	unregisterItem(item: ItemContext): void;
	reinitialize(): void;
}
