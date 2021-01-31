export type {
	OnSelectionGroupOptionsChangeEvent as OnRadioGroupChildrenChangeEvent,
	OnMultiSelectionGroupChangeEvent as OnRadioGroupChangeEvent,
} from "@raythurnevoid/svelte-group-components/ts/selectable";

export interface OnRadioChangeEvent {
	checked: boolean;
	dom: HTMLDivElement;
}
