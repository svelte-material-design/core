export interface OnRangeChangeEvent {
	dom: HTMLInputElement;
	value: number;
}

export interface OnRangeInputEvent extends OnRangeChangeEvent {}

export interface OnSliderChangeEvent {
	dom: HTMLDivElement;
	value: [number] | [number, number];
}

export interface OnSliderInputEvent extends OnSliderChangeEvent {}

export type SliderValueText = string | ((v: number) => string);

export interface SliderThumbProps {
	value: number;
}

export type SliderThumbs =
	| [SliderThumbProps]
	| [SliderThumbProps, SliderThumbProps];
