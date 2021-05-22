export type ChipSetVariant = "choice" | "filter";

export interface OnChipInteraction {
	dom: HTMLDivElement;
	value: string;
}

export interface OnChipAnimation extends OnChipInteraction {}

export interface OnChipNavigation extends OnChipInteraction {}

export interface OnChipChange {
	dom: HTMLDivElement;
	value: string;
	selected: boolean;
}
