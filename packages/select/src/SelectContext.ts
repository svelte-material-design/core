import {
	createContextBuilder,
	createContextPropBuilder,
} from "../../../packages/common";

export const [createSelectContext, getSelectContext] = createContextBuilder<
	SelectContext
>();

interface SelectContext {
	setHelperTextId(helperTextId: string): void;
}

export const [setNativeSelect, getNativeSelect] = createContextPropBuilder<
	boolean
>();
