export interface OnBannerOpening {
	dom: HTMLDivElement;
}

export interface OnBannerOpened extends OnBannerOpening {}

export interface OnBannerClosing {
	dom: HTMLDivElement;
	reason: CloseReason;
}

export interface OnBannerClosed extends OnBannerClosing {}

export type CloseReason = "primary" | "secondary";
