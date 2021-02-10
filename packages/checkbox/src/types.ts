export type { OnMultiSelectionGroupChangeEvent as OnCheckboxGroupChangeEvent } from "@raythurnevoid/svelte-group-components/ts/selectable";

export interface OnCheckboxGroupChildrenChangeEvent {
	items: HTMLDivElement[];
}

export interface OnCheckboxChangeEvent {
	checked: boolean;
	dom: HTMLDivElement;
}
