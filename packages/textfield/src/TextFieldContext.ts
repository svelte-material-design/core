import { createContextBuilder } from "../../common";

const [
	createInputFieldContext,
	getInputFieldContext,
] = createContextBuilder<InputFieldContext>();
export { createInputFieldContext, getInputFieldContext };

export interface InputFieldContext {
	readonly id: string;
	setHelperTextId(id: string);
	setLabelId?(id: string);
	reistantiate();
}
