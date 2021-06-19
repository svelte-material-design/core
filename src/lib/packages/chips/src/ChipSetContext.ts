import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";
import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/selectable";
import type { GroupBindings } from "@raythurnevoid/svelte-group-components";
import type { ChipSetVariant } from "./types";
import type { MDCChipSet } from "@material/chips/chip-set";

export const [setChipSetContext, getChipSetContext] =
	createContextStore<ChipSetContext>();

export interface ChipSetContext {
	variant: ChipSetVariant;
	group: GroupBindings;
	selectionGroup: SelectionGroupBinding;
	mdcInstance: MDCChipSet;
	reinitialize: () => void;
}

export type { ChipContext } from "../../chip/src/ChipContext";
