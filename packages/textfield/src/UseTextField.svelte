<script lang="ts">
	import { MDCTextField } from "@material/textfield";
	import { Use, UseState } from "../../../packages/common/hooks";
	import { onDestroy } from "svelte";
	import { InputFieldVariant } from "./";
	import { StringListToFilter } from "../../../packages/common/functions";

	export let dom: HTMLLabelElement = null;
	export let ripple: boolean = true;
	export let value: any = undefined;
	export let invalid: boolean = false;
	export let disabled: boolean = false;
	export let label: boolean = false;
	export let fullWidth: boolean = false;
	export let variant: InputFieldVariant = "filled";
	export let customValidation: (
		value: any,
		nativeInputInvalid: boolean
	) => boolean = undefined;
	export let classList: StringListToFilter = [];
	export let dirty: boolean = false;
	export let inputElement: HTMLInputElement | HTMLTextAreaElement = undefined;

	//#region HTML Native Input validity attrs
	// export let required: boolean = undefined;
	// export let minlength: number = undefined;
	// export let maxlength: number = undefined;
	// export let type: string = undefined;
	// export let pattern: string = undefined;
	// export let min: number = undefined;
	// export let max: number = undefined;
	//#endregion

	let nativeInputInvalid: boolean = false;
	let textField: MDCTextField;

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

		if (value != undefined && textField.value !== value) {
			textField.value = value;
		}

		if (textField.valid !== !invalid) {
			textField.valid = !invalid;
		}
	}

	$: invalid = customValidation
		? !customValidation(value, nativeInputInvalid)
		: nativeInputInvalid;

	onDestroy(() => {
		destroy();
	});

	function istantiate(
		domValue: typeof dom,
		rippleValue: typeof ripple,
		_variantValue?: typeof variant
	) {
		destroy();
		textField = new MDCTextField(domValue);
		textField.useNativeValidation = false;

		if (!rippleValue) {
			textField?.ripple?.destroy();
		}

		updateNativeInputInvalid();
	}

	function destroy() {
		textField?.destroy();
	}

	export function updateNativeInputInvalid() {
		nativeInputInvalid = inputElement.matches(":invalid");
	}

	export function handleInputChange() {
		dirty = true;
		updateNativeInputInvalid();
	}

	export function reistantiate() {
		istantiate(dom, ripple);
	}
</script>

<svelte:options immutable={true} />

<!-- If validation state change is needed on attrs modification
<UseState value={required} onUpdate={updateNativeInputInvalid} />
<UseState value={minlength} onUpdate={updateNativeInputInvalid} />
<UseState value={maxlength} onUpdate={updateNativeInputInvalid} />
<UseState value={type} onUpdate={updateNativeInputInvalid} />
<UseState value={pattern} onUpdate={updateNativeInputInvalid} />
<UseState value={min} onUpdate={updateNativeInputInvalid} />
<UseState value={max} onUpdate={updateNativeInputInvalid} /> -->

<Use
	effect
	hook={() => istantiate(dom, ripple, variant)}
	when={!!(dom && inputElement)} />
