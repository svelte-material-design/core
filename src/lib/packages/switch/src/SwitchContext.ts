import { createContextWritableStore } from "@raythurnevoid/svelte-context-enhanced";
import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/selectable";

export const [setSwitchGroupContext, getSwitchGroupContext] =
	createContextWritableStore<SwitchGroupContext>();

export interface SwitchGroupContext {
	selectionGroup: SelectionGroupBinding;
}

export const [setSwitchContext, getSwitchContext] =
	createContextWritableStore<SwitchContext>();

export interface SwitchContext {
	id: string;
	disabled: boolean;
	readonly: boolean;
	checked: boolean;
	value: string;
	setInputId(id: string);
	setInput(dom: HTMLInputElement);
}
