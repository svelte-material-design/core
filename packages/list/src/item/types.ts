export type { GraphicType as IconType } from "../../../common/components";
export type { GraphicDOM as IconDOM } from "../../../common/components";

export interface OnItemChangeEvent {
	dom: HTMLLIElement;
	selected: boolean;
}

export type ItemLines = 1 | 2 | 3;
