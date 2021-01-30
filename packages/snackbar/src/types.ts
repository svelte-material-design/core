import type { GraphicType } from "../../common/components";
export type { IconDOM } from "../../icon-button";

export interface OnSnackbarClose {
	dom: HTMLDivElement;
	reason: string;
}

export interface OnSnackbarOpen {
	dom: HTMLDivElement;
}

export type IconType = GraphicType;
