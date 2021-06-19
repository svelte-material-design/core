import {
	createContextStore,
	createContext,
} from "@raythurnevoid/svelte-context-enhanced";
import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/selectable";
import type { SelectVariant } from "./types";

export const [createSelectContext, getSelectContext] =
	createContextStore<SelectContext>();

interface SelectContext {
	id: string;
	group: SelectionGroupBinding;
	helperTextId: string;
	readonly: boolean;
	required: boolean;
	disabled: boolean;
	ripple: boolean;
	lineRipple: boolean;
	variant: SelectVariant;
	value: string;
	invalid: boolean;
	setInputElement(inputElement: HTMLInputElement): void;
	setHelperTextId(helperTextId: string): void;
}

export const [setNativeSelect, getNativeSelect] = createContext<boolean>();
