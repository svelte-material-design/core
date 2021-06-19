import type { SelectionType } from "@raythurnevoid/svelte-group-components/selectable";

export interface OnSwitchChange {
	dom: HTMLDivElement;
	checked: boolean;
}

export interface OnSwitchGroupChange {
	value: string[];
}

export interface OnSwitchGroupChildrenChange {
	items: HTMLDivElement[];
}

export type SwitchGroupValue = string | string[];

export type SwitchGroupSelectionType = SelectionType;
