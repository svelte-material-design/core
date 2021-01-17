import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";
import type { ItemContext } from "./item";
import type { SelectionType } from "../../common/hoc";
import type { ListImplRole } from "./internal";
import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";

const [createListContext, getListContext] = createContextStore<ListContext>();
export { createListContext, getListContext };

export interface ListContext {
	dom: HTMLDivElement | HTMLUListElement;
	role: ListImplRole;
	group: SelectionGroupBinding;
	isNav: boolean;
	selectionType: SelectionType;
	registerItem(item: ItemContext): void;
	unregisterItem(item: ItemContext): void;
	reinitialize(): void;
}
