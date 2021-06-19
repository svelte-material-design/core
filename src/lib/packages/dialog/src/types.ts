export interface OnDialogOpened {
	dom: HTMLDivElement;
}

export interface OnDialogClosed {
	dom: HTMLDivElement;
	action: string;
}

export type OnDialogOpening = OnDialogOpened;

export type OnDialogClosing = OnDialogClosed;
