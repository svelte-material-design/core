import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";
import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";

export const [
	setDataTableContext,
	getDataTableContext,
] = createContextStore<DataTableContext>();

interface DataTableContext {
	selectionGroup: SelectionGroupBinding;
	syncDom(): void;
	reinitialize(): void;
	layout(): void;
}
