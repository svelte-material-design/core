export type {
	OnSelectionGroupOptionsChangeEvent as OnCheckboxGroupChildrenChangeEvent,
	OnMultiSelectionGroupChangeEvent as OnCheckboxGroupChangeEvent,
} from "@raythurnevoid/svelte-group-components/ts/selectable";

export interface OnCheckboxChangeEvent {
	checked: boolean;
	dom: HTMLDivElement;
}
