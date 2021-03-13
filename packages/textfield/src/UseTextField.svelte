<svelte:options immutable={true} />

<script lang="ts">
	import { MDCTextField } from "@material/textfield";
	import { createEventDispatcher, onDestroy, onMount, tick } from "svelte";
	import type { InputFieldVariant } from "./";
	import type { StringListToFilter } from "../../common/functions";
	import { UseState } from "@raythurnevoid/svelte-hooks/ts";
	import type { Value } from "./types";
	import { handleInputValidation } from "./functions";
	import type { GetHTMLValidationMsg } from "./functions";

	export let dom: HTMLLabelElement = null;
	export let ripple: boolean = true;
	export let value: Value = undefined;
	export let invalid: boolean = false;
	export let disabled: boolean = false;
	export let label: boolean = false;
	export let fullWidth: boolean = false;
	export let variant: InputFieldVariant = "filled";
	export let customValidation: GetHTMLValidationMsg = undefined;
	export let classList: StringListToFilter = [];
	export let inputElement: HTMLInputElement | HTMLTextAreaElement = undefined;

	let nativeInputInvalid: boolean = false;
	let textField: MDCTextField;
	let valueState: UseState;

	const dispatch = createEventDispatcher<{
		input: {
			value: Value;
		};
		change: {
			value: Value;
		};
	}>();

	$: if (variant == undefined) variant = "filled";

	$: classList = [
		"mdc-text-field",
		[disabled, "mdc-text-field--disabled"],
		[!label, "mdc-text-field--no-label"],
		[invalid, "mdc-text-field--invalid"],
		[fullWidth, "mdc-text-field--fullwidth"],
		[variant === "filled", "mdc-text-field--filled"],
		[variant === "outlined", "mdc-text-field--outlined"],
	];

	$: if (textField) {
		if (textField.disabled !== disabled) {
			textField.disabled = disabled;
		}
	}

	onMount(() => {
		istantiate();
	});

	onDestroy(() => {
		destroy();
	});

	function istantiate() {
		if (dom && inputElement) {
			destroy();
			textField = new MDCTextField(dom);
			textField.useNativeValidation = true;
			inputElement.addEventListener("input", handleInput);
			inputElement.addEventListener("change", handleChange);

			if (!ripple) {
				textField?.ripple?.destroy();
			}

			value = inputElement.value;

			validate();
		}
	}

	function validate() {
		invalid = handleInputValidation({
			customValidation,
			inputElement,
		});

		if (textField.valid !== !invalid) {
			textField.valid = !invalid;
		}
	}

	async function handleInput() {
		handleInputChange();

		await tick();
		dispatch("input", {
			value,
		});
	}

	async function handleChange() {
		handleInputChange();

		await tick();
		dispatch("change", {
			value,
		});
	}

	function destroy() {
		inputElement?.removeEventListener("input", handleInput);
		inputElement?.removeEventListener("change", handleChange);
		textField?.destroy();
	}

	async function handleInputChange() {
		value = inputElement.value;
		valueState.setValue(value);
		await tick();
		validate();
	}

	function handleValueUpdate() {
		inputElement.value = "" + value;
		validate();
	}

	export function reistantiate() {
		istantiate();
	}
</script>

<UseState value={[dom, ripple, variant, inputElement]} onUpdate={istantiate} />
<UseState bind:this={valueState} {value} onUpdate={handleValueUpdate} />
