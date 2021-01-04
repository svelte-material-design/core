import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";
import type { ChipContext } from "./ChipContext";
import type { ChipSetVariant } from "./types";

export const [
	createChipSetContext,
	getChipSetContext,
] = createContextStore<ChipSetContext>();

export interface ChipSetContext {
	readonly variant: ChipSetVariant;
	registerItem(item: ChipContext): void;
	unregisterItem(item: ChipContext): void;
}
