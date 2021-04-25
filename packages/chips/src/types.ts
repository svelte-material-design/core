export type ChipSetVariant = "choice" | "filter";

export interface OnChipSetChildrenChange {
	dom: HTMLDivElement;
	items: HTMLDivElement[];
}

export interface OnChipSetChange {
	dom: HTMLDivElement;
	value: ChipSetValue;
}

export type ChipSetValue = string | string;

export interface OnChipSetInteraction {
	dom: HTMLDivElement;
	chipValue: string;
	chipDom: HTMLDivElement;
}

export interface OnChipSetSelection extends OnChipSetInteraction {
	selected: boolean;
}

export type { OnChipChange } from "../../chip/src/types";
