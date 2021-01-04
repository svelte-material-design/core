import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";

export const [
	createDataTableContext,
	getDataTableContext,
] = createContextStore<DataTableContext>();

interface DataTableContext {
	syncDom(): void;
}
