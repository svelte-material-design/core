import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";

const [
	createHelperTextContext,
	getHelperTextContext,
] = createContextStore<HelperTextContext>();
export { createHelperTextContext, getHelperTextContext };

export interface HelperTextContext {
	readonly id: string;
}
