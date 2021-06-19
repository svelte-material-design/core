export function handleInputValidation<T extends ValidableHTMLElement>({
	customValidation,
	inputElement,
}: HandleValidationInput<T>): boolean {
	let invalid: boolean;
	let validationMsg: string;

	if (customValidation) {
		inputElement.setCustomValidity("");
		validationMsg = customValidation?.(inputElement.validity);

		inputElement.setCustomValidity(validationMsg ?? "");

		if (!validationMsg) {
			invalid = false;
		} else {
			invalid = true;
		}
	} else if (!inputElement.validity.valid) {
		invalid = true;
	} else {
		invalid = false;
	}

	return invalid;
}

type ValidableHTMLElement = HTMLInputElement | HTMLTextAreaElement;

interface HandleValidationInput<T extends ValidableHTMLElement> {
	customValidation: GetHTMLValidationMsg;
	inputElement: T;
}

export type GetHTMLValidationMsg = (validityState: ValidityState) => string;
