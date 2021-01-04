import {
	createContextStore,
	createContext,
} from "@raythurnevoid/svelte-context-enhanced";

const [setRowBehaviour, getRowBehaviour] = createContext<RowBehaviour>();
export { setRowBehaviour, getRowBehaviour };

export type RowBehaviour = "header";

const [createRowContext, getRowContext] = createContextStore<RowContext>();
export { createRowContext, getRowContext };

export interface RowContext {
	setSelected(selected: boolean): void;
}
