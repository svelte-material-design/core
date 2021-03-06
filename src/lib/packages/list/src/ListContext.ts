import { createContextWritableStore } from "@raythurnevoid/svelte-context-enhanced";
import type { ItemContext, ItemLines } from "./item";
import type { SelectionType } from "../../common/hoc";
import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/selectable";
import type { GroupBindings } from "@raythurnevoid/svelte-group-components/components-group";

const [createListContext, getListContext] =
	createContextWritableStore<ListContext>();
export { createListContext, getListContext };

export interface ListContext {
	dom: HTMLDivElement | HTMLUListElement;
	listSelectionGroup: SelectionGroupBinding;
	a: number;
	listGroup: GroupBindings;
	selectionType: SelectionType;
	itemsRows: ItemLines;
	registerItem(item: ItemContext): void;
	unregisterItem(item: ItemContext): void;
	reinitialize(): void;
}
