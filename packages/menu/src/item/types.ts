export type { GraphicType as IconType } from "../../../common/components";
export type { GraphicDOM as IconDOM } from "../../../common/components";

export interface OnItemSelectedEvent {
	dom: HTMLLIElement;
}

export interface OnItemChangeEvent {
	dom: HTMLLIElement;
	selected: boolean;
}
