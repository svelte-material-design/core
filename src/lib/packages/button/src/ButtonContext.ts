import { createContextWritableStore } from "@raythurnevoid/svelte-context-enhanced";

export const [setButtonContext, getButtonContext] =
	createContextWritableStore<ButtonContext>();

export interface ButtonContext {
	setHasLeadingIcon(value: boolean): void;
	setHasTrailingIcon(value: boolean): void;
}
