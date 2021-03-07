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
	import type { OnInputFieldChange, OnInputFieldInput, Value } from "./types";
	import { createEventDispatcher } from "svelte";
	import type { GetHTMLValidationMsg } from "./functions";
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
	export let value: Value = undefined;
	export let invalid: boolean = false;
	export let variant: InputFieldVariant = "filled";
	export let customValidation: GetHTMLValidationMsg = undefined;
	export let lineRipple: boolean = true;
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

	const dispatch = createEventDispatcher<{
		input: OnInputFieldInput;
		change: OnInputFieldChange;
	}>();

	const formFieldContext$ = getFormFieldContext();

	$: $formFieldContext$?.setInputId(inputId);

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

	function reistantiate() {
		useInputField.reistantiate();
	}
	//#endregion
</script>

<UseState value={[type, lineRipple]} onUpdate={reistantiate} />

<div
	bind:this={dom}
	{id}
	class={classList([className, "smui-text-field__wrapper"])}
	{style}
	{...$$restProps}
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur
	on:focusin
	on:focusout
>
	<slot />
</div>

<UseTextField
	bind:this={useInputField}
	bind:classList={inputFieldClassList}
	bind:value
	bind:invalid
	{ripple}
	{disabled}
	{variant}
	{customValidation}
	dom={contentElement}
	{inputElement}
	label={hasLabel}
	fullWidth={false}
	on:input={() => {
		dispatch("input", {
			value,
			dom,
		});
	}}
	on:change={() => {
		dispatch("change", {
			value,
			dom,
		});
	}}
/>
