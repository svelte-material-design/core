export type TopAppBarVariant = "standard" | "fixed";
export type TopAppBarColor = "primary" | "secondary";
export interface OnTopAppBarCollapsedChange {
	dom: HTMLDivElement;
	collapsed: boolean;
}
