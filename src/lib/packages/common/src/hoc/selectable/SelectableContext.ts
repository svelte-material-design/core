import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";

const [
	setSelectableContext,
	getSelectableContext,
] = createContextStore<SelectableContext>();
export { setSelectableContext, getSelectableContext };

export interface SelectableContext {
	readonly value: any;
	readonly selected: boolean;
	readonly tabindex: number;
	readonly disabled: boolean;
	setSelected(selected: boolean): void;
	setValue(value: any): void;
	setTabIndex(tabindex: number): void;
}
