export interface SliderChangeEvent {
	dom: HTMLDivElement;
	value: number;
}

export type SliderValueText = string | ((v: number) => string);

export type SliderValue = number | [number, number];

export interface SliderThumbProps {
	value: number;
}

export type SliderThumbs =
	| [SliderThumbProps]
	| [SliderThumbProps, SliderThumbProps];
