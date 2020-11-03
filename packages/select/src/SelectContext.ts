import { createContextPropBuilder } from "../../../packages/common";

export const [setNativeSelect, getNativeSelect] = createContextPropBuilder<
	boolean
>();
