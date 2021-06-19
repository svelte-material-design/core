import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";

export const [setSnackbarConcurrencyContext, getSnackbarConcurrencyContext] =
	createContextStore<SelectContext>();

interface SelectContext {
	requestOpen(snackbarBindings: ConcurrentSnackbarContext): void;
	notifyClosed(
		snackbarBindings: ConcurrentSnackbarContext,
		reason?: string
	): void;
}

export interface ConcurrentSnackbarContext {
	dom: HTMLDivElement;
	value: string;
	open: () => void;
	close: () => void;
}
