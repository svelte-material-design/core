import { createContextBuilder } from "../../../../packages/common";

const [createHelperTextContext, getHelperTextContext] = createContextBuilder<
	HelperTextContext
>();
export { createHelperTextContext, getHelperTextContext };

export interface HelperTextContext {
	readonly id: string;
}
