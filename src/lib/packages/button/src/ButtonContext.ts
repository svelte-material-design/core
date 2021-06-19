import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";

export const [setButtonContext, getButtonContext] =
	createContextStore<ButtonContext>();

export interface ButtonContext {
	setHasLeadingIcon(value: boolean): void;
	setHasTrailingIcon(value: boolean): void;
}
