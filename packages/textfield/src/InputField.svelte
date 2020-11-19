<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import {
		parseClassList,
		StringListToFilter,
	} from "../../../packages/common/functions";
	import { DOMEventsForwarder } from "../../../packages/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/input-field/InputField:${count++}`;

	export let dom: HTMLLabelElement = undefined;

	import { BaseProps } from "../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// TextField
	import { InputFieldType, InputFieldVariant } from "./";
	import { FloatingLabel } from "../../../packages/floating-label";
	import { LineRipple } from "../../../packages/line-ripple";
	import { createInputFieldContext } from "./TextFieldContext";
	import { NotchedOutline } from "../../../packages/notched-outline";
	import UseTextField from "./UseTextField.svelte";
	import { Span } from "../../../packages/common/dom";
	import { UseState } from "../../../packages/common/hooks";
	import { getFormFieldContext } from "../../form-field";

	//#region exports
	//#region UseTextField props
	export let ripple: boolean = true;
	export let value: any = undefined;
	export let invalid: boolean = false;
	export let disabled: boolean = false;
	export let variant: InputFieldVariant = "filled";
	export let customValidation: (
		value: any,
		nativeInputInvalid: boolean
	) => boolean = undefined;
	//#endregion

	export let lineRipple: boolean = true;
	export let density: number = undefined;
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

	export let type: InputFieldType = "text";

	export let autocomplete: string = undefined;
	export let pattern: string = undefined;
	export let formnovalidate: boolean = undefined;

	export let size: number = undefined;

	export let step: number = undefined;
	export let min: number = undefined;
	export let max: number = undefined;

	export let ariaLabel: string = undefined;
	//#endregion
	//#endregion

	//#region internal props
	let useInputField: UseTextField;
	let helperTextId: string;
	let labelId: string;
	let inputElement: HTMLInputElement;
	let textFieldClassList: StringListToFilter = [];
	let optionsId: string = `${id}-options`;
	let inputId: string = `${id}-input`;
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
		setHelperTextId(id: string) {
			helperTextId = id;
		},
		setLabelId(id: string) {
			labelId = id;
		},
		reistantiate() {
			useInputField.reistantiate();
		},
	});

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

<div class="smui-text-field__wrapper">
	<label
		bind:this={dom}
		{id}
		class={parseClassList([
			className,
			...textFieldClassList,
			[$$slots.leadingIcon, 'mdc-text-field--with-leading-icon'],
			[$$slots.trailingIcon, 'mdc-text-field--with-trailing-icon'],
			[
				variant == 'filled' && density,
				`smui-input-field--filled--dense--${Math.abs(density)}`,
			],
			[
				variant == 'outlined' && !$$slots.trailingIcon && density,
				`smui-input-field--outlined--dense--${Math.abs(density)}`,
			],
			[
				variant == 'outlined' && $$slots.leadingIcon && density,
				`smui-input-field--outlined--with-leading-icon--dense--${Math.abs(
					density
				)}`,
			],
		])}
		{style}
		for={id}>
		{#if ripple}<span class="mdc-text-field__ripple" />{/if}
		{#if $$slots.leadingIcon}
			<slot name="leadingIcon" />
		{/if}
		{#if prefix}
			<span
				class="mdc-text-field__affix mdc-text-field__affix--prefix">{prefix}</span>
		{/if}
		<input
			bind:this={inputElement}
			{...props}
			id={inputId}
			class="mdc-text-field__input"
			{type}
			{name}
			{placeholder}
			{size}
			{title}
			{maxlength}
			{minlength}
			{step}
			{min}
			{max}
			{autocomplete}
			{pattern}
			{required}
			{readonly}
			{formnovalidate}
			list={$$slots.options ? optionsId : undefined}
			aria-controls={helperTextId}
			aria-describedby={helperTextId}
			aria-labelledby={labelId}
			aria-label={placeholder && !labelId ? placeholder : ariaLabel}
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
		{#if variant === 'filled'}
			{#if $$slots.label}
				<FloatingLabel component={Span}>
					<slot name="label" />
				</FloatingLabel>
			{/if}
			{#if lineRipple}
				<LineRipple />
			{/if}
		{:else if variant === 'outlined'}
			<NotchedOutline noLabel={!$$slots.label}>
				{#if $$slots.label}
					<FloatingLabel component={Span}>
						<slot name="label" />
					</FloatingLabel>
				{/if}
			</NotchedOutline>
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
	{ripple}
	{disabled}
	{variant}
	{customValidation}
	{dom}
	{inputElement}
	label={$$slots.label}
	fullWidth={false} />
