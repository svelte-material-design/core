import {
	createContextStore,
	createContext,
} from "@raythurnevoid/svelte-context-enhanced";
import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";

export const [
	createSelectContext,
	getSelectContext,
] = createContextStore<SelectContext>();

interface SelectContext {
	group: SelectionGroupBinding;
	setHelperTextId(helperTextId: string): void;
}

export const [setNativeSelect, getNativeSelect] = createContext<boolean>();
