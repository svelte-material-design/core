<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList, StringListToFilter } from "../../common/functions";
	import { DOMEventsForwarder } from "../../common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/input-field/FullWidthTextField:${count++}`;

	export let dom: HTMLLabelElement = undefined;

	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// TextField
	import { createInputFieldContext } from "./TextFieldContext";
	import { LineRipple } from "../../line-ripple";
	import UseTextField from "./UseTextField.svelte";
	import { InputFieldCustomValidation, FullWidthTextFieldType } from "./";
	import { UseState } from "@raythurnevoid/svelte-hooks";

	//#region exports
	//#region UseTextField props
	export let value: string = undefined;
	export let invalid: boolean = false;
	export let disabled: boolean = false;
	export let customValidation: InputFieldCustomValidation = undefined;
	//#endregion

	export let lineRipple: boolean = true;
	export let dirty: boolean = false;

	//#region HTML attrs
	//#region commons HTML attrs
	export let name: string = undefined;
	export let title: string = undefined;
	export let placeholder: string = undefined;

	export let required: boolean = undefined;
	export let readonly: boolean = undefined;

	export let minlength: number = undefined;
	export let maxlength: number = undefined;
	//#endregion

	export let prefix: string = undefined;
	export let suffix: string = undefined;

	export let type: FullWidthTextFieldType = "text";

	export let autocomplete: string = undefined;
	export let pattern: string = undefined;
	export let formnovalidate: boolean = undefined;
	//#endregion
	//#endregion

	//#region internal props
	let useInputField: UseTextField;
	let helperTextId: string;
	let inputElement: HTMLInputElement;
	let textFieldClassList: StringListToFilter = [];
	let optionsId: string = `${id}_options`;
	//#endregion

	const context$ = createInputFieldContext({
		id,
		setHelperTextId(id: string) {
			helperTextId = id;
		},
		reistantiate() {
			useInputField.reistantiate();
		},
	});

	function handleTypeUpdate() {
		value = inputElement.value;
		reistantiate();
	}

	function reistantiate() {
		$context$?.reistantiate();
	}

	function valueUpdater() {
		value = inputElement.value;
	}

	function changeHandler() {
		useInputField.handleInputChange();
	}
</script>

<style>
	:global([slot="leadingIcon"]),
	:global([slot="trailingIcon"]) {
		display: contents;
	}
</style>

<svelte:options immutable={true} />

<UseState value={type} onUpdate={handleTypeUpdate} />
<UseState value={lineRipple} onUpdate={reistantiate} />

<div class="smui-text-field__wrapper smui-text-field__wrapper--fullwidth">
	<label
		bind:this={dom}
		for={id}
		class={parseClassList([
			className,
			...textFieldClassList,
			[$$slots.leadingIcon, 'mdc-text-field--with-leading-icon'],
			[$$slots.trailingIcon, 'mdc-text-field--with-trailing-icon'],
		])}
		{style}>
		<span class="mdc-text-field__ripple" />
		{#if $$slots.leadingIcon}
			<slot name="leadingIcon" class="mdc-text-field__icon--leading" />
		{/if}
		{#if prefix}
			<span
				class="mdc-text-field__affix mdc-text-field__affix--prefix">{prefix}</span>
		{/if}
		<input
			bind:this={inputElement}
			{...props}
			{id}
			class="mdc-text-field__input"
			{type}
			{name}
			{placeholder}
			{title}
			{maxlength}
			{minlength}
			{autocomplete}
			{pattern}
			{required}
			{readonly}
			{formnovalidate}
			list={$$slots.options ? optionsId : undefined}
			aria-controls={helperTextId}
			aria-describedby={helperTextId}
			aria-label={placeholder}
			on:input={valueUpdater}
			on:change={changeHandler}
			use:forwardDOMEvents />
		{#if suffix}
			<span
				class="mdc-text-field__affix mdc-text-field__affix--suffix">{suffix}</span>
		{/if}
		{#if $$slots.trailingIcon}
			<slot name="trailingIcon" class="mdc-text-field__icon--trailing" />
		{/if}

		{#if lineRipple}
			<LineRipple color="primary" />
		{/if}
	</label>

	<slot />

	{#if $$slots.options}
		<datalist id={optionsId}>
			<slot name="options" />
		</datalist>
	{/if}
</div>

<UseTextField
	bind:this={useInputField}
	bind:classList={textFieldClassList}
	bind:value
	bind:invalid
	bind:dirty
	{disabled}
	{customValidation}
	{inputElement}
	ripple={false}
	label={false}
	variant="outlined"
	fullWidth={false} />
