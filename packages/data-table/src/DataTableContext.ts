import {
	createContextStore,
	createContext,
} from "@raythurnevoid/svelte-context-enhanced";
import type { GroupBindings } from "@raythurnevoid/svelte-group-components/ts";
import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";

export const [
	setDataTableContext,
	getDataTableContext,
] = createContextStore<DataTableContext>();

interface DataTableContext {
	selectionGroup: SelectionGroupBinding;
	group: GroupBindings;
	reinitialize(): void;
	layout(): void;
	showProgress(show: boolean): void;
}

export const [setRowContext, getRowContext] = createContextStore<RowContext>();
export const [setRowBehaviour, getRowBehaviour] = createContext<RowBehaviour>();

export interface RowContext {
	selected: boolean;
}

export type RowBehaviour = "header" | "body";
