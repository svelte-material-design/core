import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";
import type { SortDirection } from ".";

export const [createHeadCellContext, getHeadCellContext] =
	createContextStore<HeadCellContext>();

interface HeadCellContext {
	setSort(enabled: boolean): void;
	setSortDirection(direction: SortDirection): void;
}
