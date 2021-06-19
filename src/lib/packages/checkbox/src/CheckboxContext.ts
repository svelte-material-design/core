import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";
import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/selectable";

export const [setCheckboxGroupContext, getCheckboxGroupContext] =
	createContextStore<CheckboxGroupContext>();

export interface CheckboxGroupContext {
	group: SelectionGroupBinding;
}
