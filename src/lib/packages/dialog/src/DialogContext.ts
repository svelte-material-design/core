import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";

const [
	createDialogContext,
	getDialogContext,
] = createContextStore<DialogContext>();
export { createDialogContext, getDialogContext };

export interface DialogContext {
	readonly isOpen: boolean;
	setTitleId(titleId: string): void;
	setContentId(contentId: string): void;
}
