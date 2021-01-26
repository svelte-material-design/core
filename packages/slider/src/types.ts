export interface OnRangeChangeEvent {
	dom: HTMLInputElement;
	value: number;
}

export interface SliderChangeEvent {
	dom: HTMLDivElement;
}

export interface SliderInputEvent extends SliderChangeEvent {}

export type SliderValueText = string | ((v: number) => string);

export interface SliderThumbProps {
	value: number;
}

export type SliderThumbs =
	| [SliderThumbProps]
	| [SliderThumbProps, SliderThumbProps];
