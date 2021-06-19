import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";
import type { MDCChip } from "@material/chips/chip";

export const [createChipContext, getChipContext] =
	createContextStore<ChipContext>();

export interface ChipContext {
	chip: MDCChip;
	dom: HTMLDivElement;
	selected: boolean;
	value: string;
	isLeadingIconHidden: boolean;
	removeOnTrailingIconClick: boolean;
	reinitialize(): void;
	setSelected(selected: boolean);
}
