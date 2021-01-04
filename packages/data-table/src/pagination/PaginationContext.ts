import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";

export const [
	createPaginationContext,
	getPaginationContext,
] = createContextStore<PaginationContext>();

interface PaginationContext {
	setPageSize(pageSize: number): void;
}
