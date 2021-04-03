export type DrawerVariant = "permanent" | "dismissible" | "modal";
export interface OnOpenEvent {
	dom: HTMLDivElement;
}
export interface OnCloseEvent extends OnOpenEvent {}
