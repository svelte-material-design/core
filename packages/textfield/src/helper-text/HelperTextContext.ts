import { createContextBuilder } from "../../../common";

const [
	createHelperTextContext,
	getHelperTextContext,
] = createContextBuilder<HelperTextContext>();
export { createHelperTextContext, getHelperTextContext };

export interface HelperTextContext {
	readonly id: string;
}
