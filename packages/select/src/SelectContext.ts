import {
	createContextBuilder,
	createContextPropBuilder,
} from "../../../packages/common";
import { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/esm/selectable";

export const [
	createSelectContext,
	getSelectContext,
] = createContextBuilder<SelectContext>();

interface SelectContext {
	group: SelectionGroupBinding;
	setHelperTextId(helperTextId: string): void;
}

export const [
	setNativeSelect,
	getNativeSelect,
] = createContextPropBuilder<boolean>();
