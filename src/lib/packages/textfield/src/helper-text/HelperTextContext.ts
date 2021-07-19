import { createContextWritableStore } from "@raythurnevoid/svelte-context-enhanced";

const [createHelperTextContext, getHelperTextContext] =
	createContextWritableStore<HelperTextContext>();
export { createHelperTextContext, getHelperTextContext };

export interface HelperTextContext {
	readonly id: string;
}
