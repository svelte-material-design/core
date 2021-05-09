import type { SortActionEventDetail } from "@material/data-table";

export type SortDirection = "ascending" | "descending" | "none";
export interface OnDataTableSort
	extends Omit<SortActionEventDetail, "sortValue"> {
	sortValue: SortDirection;
}

export type DataTableValue = string | string[];

export interface OnRowChange {
	dom: HTMLTableRowElement;
	selected: boolean;
}

export interface OnDataTableChange {
	dom: HTMLDivElement;
	value: DataTableValue;
}

export interface OnPageSizeChange {
	dom: HTMLDivElement;
	value: number;
}

export interface OnDataTableAction {
	dom: HTMLDivElement;
}
