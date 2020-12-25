import { GraphicType } from "../../../packages/common/components";

export { IconDOM } from "../../../packages/icon-button";

export interface OnSnackbarClose {
	dom: HTMLDivElement;
	reason: string;
}

export interface OnSnackbarOpen {
	dom: HTMLDivElement;
}

export type IconType = GraphicType;
