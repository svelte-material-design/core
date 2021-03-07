import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";
import type { StringListToFilter } from "../../common/functions";
import type { InputFieldVariant } from "./types";

const [
	createInputFieldContext,
	getInputFieldContext,
] = createContextStore<InputFieldContext>();
export { createInputFieldContext, getInputFieldContext };

export interface InputFieldContext {
	id: string;
	helperTextId: string;
	labelId: string;
	inputId: string;
	ripple: boolean;
	lineRipple: boolean;
	variant: InputFieldVariant;
	inputFieldClassList: StringListToFilter;
	setInputElement(inputElement: HTMLInputElement): void;
	setHelperTextId(id: string): void;
	setLabelId?(id: string): void;
	setInputId?(id: string): void;
	reistantiate(): void;
	setHasLabel(hasLabel: boolean): void;
	setContentElement(element: HTMLLabelElement): void;
}

export const [
	setContentContext,
	getContentContext,
] = createContextStore<ContentContext>();

export interface ContentContext {
	setHasLeadingIcon(value: boolean): void;
	setHasTrailingIcon(value: boolean): void;
}
