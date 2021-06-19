export type { OnSingleSelectionGroupChangeEvent as OnRadioGroupChangeEvent } from "@raythurnevoid/svelte-group-components/selectable";

export interface OnRadioGroupChildrenChangeEvent {
	items: HTMLDivElement[];
}

export interface OnRadioChangeEvent {
	checked: boolean;
	dom: HTMLDivElement;
}
