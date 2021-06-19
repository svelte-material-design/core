import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";
import type { MDCFormField, MDCFormFieldInput } from "@material/form-field";

const [
	createFormFieldContext,
	getFormFieldContext,
] = createContextStore<FormFieldContext>();
export { createFormFieldContext, getFormFieldContext };

export interface FormFieldContext {
	readonly instance: MDCFormField;
	readonly inputId: string;
	readonly labelId: string;
	readonly id: string;
	setInput(value: MDCFormFieldInput);
	setInputId(id: string);
	setLabelId(labelId: string);
}
