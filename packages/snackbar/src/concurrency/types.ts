import type { OnSnackbarOpen, OnSnackbarClose } from "../types";

export interface OnSnackbarConcurrencyOpen extends OnSnackbarOpen {
	value: string;
}

export interface OnSnackbarConcurrencyClose extends OnSnackbarClose {
	value: string;
}
