import { createContextBuilder } from "../../../packages/common";

const [createInputFieldContext, getInputFieldContext] = createContextBuilder<
	InputFieldContext
>();
export { createInputFieldContext, getInputFieldContext };

export interface InputFieldContext {
	setHelperTextId(id: string);
	setLabelId?(id: string);
	reistantiate();
}
