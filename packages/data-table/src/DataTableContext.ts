import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";

export const [
	setDataTableContext,
	getDataTableContext,
] = createContextStore<DataTableContext>();

interface DataTableContext {
	syncDom(): void;
}
