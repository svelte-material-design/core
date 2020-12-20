import { IconDOM as IconButtonIconDOM } from "../../../packages/icon-button";
import { GraphicType } from "../../../packages/common/components";

export interface OnSnackbarClose {
	dom: HTMLDivElement;
	reason: string;
}

export interface OnSnackbarOpen {
	dom: HTMLDivElement;
}

export type IconDOM = IconButtonIconDOM;
export type IconType = GraphicType;
