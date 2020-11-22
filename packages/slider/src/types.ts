export interface SliderChangeEvent {
	dom: HTMLDivElement;
	value: number;
}

export interface RangeSliderChangeEvent {
	dom: HTMLDivElement;
	value: [number, number];
}

export type SliderValueText = string | ((v: number) => string);

export interface SliderThumbProps {
	value: number;
}

export type SliderThumbs =
	| [SliderThumbProps]
	| [SliderThumbProps, SliderThumbProps];
