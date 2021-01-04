import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";
import type { MDCChip } from "@material/chips";

export const [
	createChipContext,
	getChipContext,
] = createContextStore<ChipContext>();

export interface ChipContext {
	chip: MDCChip;
	dom: HTMLDivElement;
	selected: boolean;
	setChip(chip: MDCChip): void;
	reinitializeMDC(): void;
}
