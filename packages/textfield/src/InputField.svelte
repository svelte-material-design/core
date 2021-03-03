<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import type { InputFieldType, InputFieldVariant } from "./types";
	import { createInputFieldContext } from "./TextFieldContext";
	import UseTextField from "./UseTextField.svelte";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { getFormFieldContext } from "../../form-field";
	import { classList, StringList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/input-field/InputField:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let value: any = undefined;
	export let invalid: boolean = false;
	export let variant: InputFieldVariant = "filled";
	export let customValidation: (
		value: any,
		nativeInputInvalid: boolean
	) => boolean = undefined;
	export let lineRipple: boolean = true;
	export let density: number = undefined;
	export let dirty: boolean = false;
	export let disabled: boolean = false;
	export let type: InputFieldType = "text";
	//#endregion

	//#region implementation
	//#region internal props
	let useInputField: UseTextField;
	let helperTextId: string;
	let labelId: string;
	let inputElement: HTMLInputElement;
	let inputFieldClassList: StringList = [];
	let inputId: string = `${id}-input`;
	let hasLabel: boolean = false;
	let contentElement: HTMLLabelElement;
	//#endregion

	const formFieldContext$ = getFormFieldContext();

	$: $formFieldContext$?.setInputId(inputId);
	$: if (density != undefined) {
		if (density < -4) {
			density = -4;
		} else if (density > 0) {
			density = 0;
		}
	}

	const context$ = createInputFieldContext({
		id,
		ripple,
		lineRipple,
		variant,
		inputFieldClassList,
		setHelperTextId(id: string) {
			helperTextId = id;
		},
		setLabelId(id: string) {
			labelId = id;
		},
		setInputId(id: string) {
			inputId = id;
		},
		reistantiate() {
			useInputField.reistantiate();
		},
		setInputElement(element: HTMLInputElement) {
			inputElement = element;
		},
		setHasLabel(value: boolean) {
			hasLabel = value;
		},
		setContentElement(element: HTMLLabelElement) {
			contentElement = element;
		},
		valueUpdater,
		changeHandler,
	});
	$: $context$ = {
		...$context$,
		labelId,
		helperTextId,
		inputId,
		ripple,
		lineRipple,
		variant,
		inputFieldClassList,
	};

	function handleTypeUpdate() {
		valueUpdater();
		reistantiate();
	}

	function reistantiate() {
		$context$?.reistantiate();
	}

	function toNumber(value) {
		if (value === "") {
			return Number.NaN;
		}

		return +value;
	}

	function valueUpdater() {
		switch (type) {
			case "number":
				value = toNumber(inputElement.value);
				break;
			default:
				value = inputElement.value;
				break;
		}
	}

	function changeHandler() {
		useInputField.handleInputChange();
	}
	//#endregion
</script>

<UseState value={type} onUpdate={handleTypeUpdate} />
<UseState value={lineRipple} onUpdate={reistantiate} />

<div
	bind:this={dom}
	{id}
	class={classList([className, "smui-text-field__wrapper"])}
	{style}
	{...$$restProps}
>
	<slot />
</div>

<UseTextField
	bind:this={useInputField}
	bind:classList={inputFieldClassList}
	bind:value
	bind:invalid
	bind:dirty
	{ripple}
	{disabled}
	{variant}
	{customValidation}
	dom={contentElement}
	{inputElement}
	label={hasLabel}
	fullWidth={false}
/>
