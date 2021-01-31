import type { ListRole } from "../";

export type ListImplRole = ListRole | "listbox" | "menu";

export interface OnListActionEvent {
	targetIndex: number;
	listSelectedIndex: number | number[];
}
