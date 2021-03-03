<svelte:options immutable={true} />

<script lang="ts">
	import { MDCTextField } from "@material/textfield";
	import { Use } from "@raythurnevoid/svelte-hooks";
	import { onDestroy } from "svelte";
	import type { InputFieldVariant } from "./";
	import type { StringListToFilter } from "../../common/functions";

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
		if (dom && inputElement) istantiate(dom, ripple);
	}
</script>

<Use
	effect
	hook={() => istantiate(dom, ripple, variant)}
	when={!!(dom && inputElement)}
/>
