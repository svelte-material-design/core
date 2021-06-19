<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { createInputFieldContext } from "./TextFieldContext";
	import UseTextField from "./UseTextField.svelte";
	import { getFormFieldContext } from "../../form-field";
	import { classList } from "@raythurnevoid/strings-filter";
	import type { StringList } from "@raythurnevoid/strings-filter";
	import type { OnInputFieldChange, OnInputFieldInput, Value } from "./types";
	import { createEventDispatcher } from "svelte";
	import type { GetHTMLValidationMsg } from "./functions";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/input-field/TextAreaField:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let value: Value = undefined;
	export let invalid: boolean = false;
	export let customValidation: GetHTMLValidationMsg = undefined;
	export let disabled: boolean = false;
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
		inputFieldClassList,
		textArea: true,
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
		inputFieldClassList,
	};

	//#endregion
</script>

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
	<slot
		leadingClassName="mdc-text-field__icon--leading"
		trailingClassName="mdc-text-field__icon--trailing"
	/>
</div>

<UseTextField
	bind:this={useInputField}
	bind:classList={inputFieldClassList}
	bind:value
	bind:invalid
	{ripple}
	{disabled}
	{customValidation}
	dom={contentElement}
	{inputElement}
	label={hasLabel}
	variant="outlined"
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
