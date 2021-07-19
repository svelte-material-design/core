import { createContextWritableStore } from "@raythurnevoid/svelte-context-enhanced";

export const [createPaginationContext, getPaginationContext] =
	createContextWritableStore<PaginationContext>();

interface PaginationContext {
	setPageSize(pageSize: number): void;
}
