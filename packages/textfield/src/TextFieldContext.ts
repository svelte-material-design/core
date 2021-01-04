import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";

const [
	createInputFieldContext,
	getInputFieldContext,
] = createContextStore<InputFieldContext>();
export { createInputFieldContext, getInputFieldContext };

export interface InputFieldContext {
	readonly id: string;
	setHelperTextId(id: string);
	setLabelId?(id: string);
	reistantiate();
}
