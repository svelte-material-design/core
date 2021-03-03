import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";
import type { StringListToFilter } from "packages/common/functions";
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
	setInputElement(inputElement: HTMLInputElement);
	setHelperTextId(id: string);
	setLabelId?(id: string);
	setInputId?(id: string);
	reistantiate();
	valueUpdater();
	changeHandler();
	setHasLabel(hasLabel: boolean);
	setContentElement(element: HTMLLabelElement);
}

export const [
	setContentContext,
	getContentContext,
] = createContextStore<ContentContext>();

export interface ContentContext {
	setHasLeadingIcon(value: boolean);
	setHasTrailingIcon(value: boolean);
}
