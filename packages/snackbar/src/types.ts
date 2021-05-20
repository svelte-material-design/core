import type { GraphicType } from "../../common/components";
export type { IconDOM } from "../../icon-button";

export interface OnSnackbarClose {
	dom: HTMLDivElement;
	reason?: SnackbarCloseReason;
}

export interface OnSnackbarOpen {
	dom: HTMLDivElement;
}

export type IconType = GraphicType;

export type SnackbarCloseReason = "dismiss" | "action";
