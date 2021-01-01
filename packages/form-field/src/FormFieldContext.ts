import { createContextBuilder } from "../../common";
import { MDCFormField, MDCFormFieldInput } from "@material/form-field";

const [
	createFormFieldContext,
	getFormFieldContext,
] = createContextBuilder<FormFieldContext>();
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
