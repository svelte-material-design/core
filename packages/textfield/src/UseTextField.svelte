<script lang="ts">
	import { MDCTextField } from "@material/textfield";
	import { Use } from "../../../packages/common/hooks";
	import { onDestroy } from "svelte";
	import { InputFieldVariant } from "./";
	import { StringListToFilter } from "../../../packages/common/functions";

	export let dom: HTMLLabelElement = null;
	export let ripple: boolean = true;
	export let value: any = undefined;
	export let invalid: boolean = false;
	export let disabled: boolean = false;
	export let nativeInputInvalid: boolean = false;
	export let label: boolean = false;
	export let fullWidth: boolean = false;
	export let variant: InputFieldVariant = "filled";
	export let customValidation: (
		value: any,
		nativeInputInvalid: boolean
	) => boolean = undefined;
	export let classList: StringListToFilter = [];

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
	}

	function destroy() {
		textField?.destroy();
	}

	export function reistantiate() {
		istantiate(dom, ripple);
	}
</script>

<svelte:options immutable={true} />

<Use effect hook={() => istantiate(dom, ripple, variant)} when={!!dom} />
