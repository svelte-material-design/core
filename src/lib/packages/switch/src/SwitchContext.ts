import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";
import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";

export const [setSwitchGroupContext, getSwitchGroupContext] =
	createContextStore<SwitchGroupContext>();

export interface SwitchGroupContext {
	selectionGroup: SelectionGroupBinding;
}

export const [setSwitchContext, getSwitchContext] =
	createContextStore<SwitchContext>();

export interface SwitchContext {
	id: string;
	disabled: boolean;
	readonly: boolean;
	checked: boolean;
	value: string;
	setInputId(id: string);
	setInput(dom: HTMLInputElement);
}
