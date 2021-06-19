export interface OnBannerOpening {
	dom: HTMLDivElement;
}

export interface OnBannerOpened extends OnBannerOpening {}

export interface OnBannerClosing {
	dom: HTMLDivElement;
	reason: CloseReason;
}

export interface OnBannerClosed extends OnBannerClosing {}

export type ActionType = "primary" | "secondary";
export type CloseReason = ActionType;
