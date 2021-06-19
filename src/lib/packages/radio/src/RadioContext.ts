import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";
import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/selectable";

export const [setRadioGroupContext, getRadioGroupContext] =
	createContextStore<RadioGroupContext>();

export interface RadioGroupContext {
	group: SelectionGroupBinding;
}
