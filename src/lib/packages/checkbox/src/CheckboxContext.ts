import { createContextWritableStore } from "@raythurnevoid/svelte-context-enhanced";
import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/selectable";

export const [setCheckboxGroupContext, getCheckboxGroupContext] =
	createContextWritableStore<CheckboxGroupContext>();

export interface CheckboxGroupContext {
	group: SelectionGroupBinding;
}
