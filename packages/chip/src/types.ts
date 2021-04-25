export type ChipSetVariant = "choice" | "filter";

export interface OnChipInteraction {
	dom: HTMLDivElement;
	value: string;
}

export interface OnChipChange {
	dom: HTMLDivElement;
	value: string;
	selected: boolean;
}
