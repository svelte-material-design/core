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
	export let id: string = `@smui/input-field/TextArea:${count++}`;

	export let dom: HTMLLabelElement = undefined;

	import { BaseProps } from "../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Textarea
	import { onMount } from "svelte";
	import UseTextField from "./UseTextField.svelte";
	import { createInputFieldContext } from "./TextFieldContext";
	import { FloatingLabel } from "../../../packages/floating-label";
	import { NotchedOutline } from "../../../packages/notched-outline";
	import { RippleProps, Ripple3 } from "../../../packages/ripple";
	import { Span } from "../../../packages/common/dom";

	//#region UseTextField params
	export let ripple: boolean = true;
	export let value: string = undefined;
	export let invalid: boolean = false;
	export let disabled: boolean = false;
	export let fullWidth: boolean = false;
	export let resizable: boolean = false;
	//#endregion

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

	export let cols: number = undefined;
	export let rows: number = undefined;
	export let wrap: "hard" = undefined;
	//#endregion

	//#region internal props
	let useInputField: UseTextField;
	let helperTextId: string;
	let labelId: string;
	let textareaElement: HTMLTextAreaElement;
	let textFieldClassList: StringListToFilter = [];
	//#endregion

	createInputFieldContext({
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

	onMount(() => {
		invalid = dom.matches(":invalid");
	});

	function valueUpdater() {
		value = textareaElement.value;
	}

	function changeHandler(e) {
		dirty = true;
		invalid = dom.matches(":invalid");
	}
</script>

<svelte:options immutable={true} />

<div
	class="smui-text-field__wrapper {fullWidth ? 'smui-text-field__wrapper--fullwidth' : ''}">
	<label
		bind:this={dom}
		for={id}
		class={parseClassList([
			className,
			...textFieldClassList,
			'mdc-text-field--textarea',
		])}
		{style}>
		{#if ripple}<span class="mdc-text-field__ripple" />{/if}
		{#if resizable}
			<span class="mdc-text-field__resizer">
				<textarea
					bind:this={textareaElement}
					{...props}
					{id}
					class="mdc-text-field__input"
					{style}
					{name}
					{title}
					{placeholder}
					{minlength}
					{maxlength}
					{required}
					{readonly}
					{rows}
					{cols}
					{wrap}
					aria-controls={helperTextId}
					aria-describedby={helperTextId}
					aria-labelledby={labelId}
					on:input={valueUpdater}
					on:change={changeHandler}
					use:forwardDOMEvents />
			</span>
		{:else}
			<textarea
				bind:this={textareaElement}
				{...props}
				{id}
				class="mdc-text-field__input"
				{style}
				{name}
				{title}
				{placeholder}
				{minlength}
				{maxlength}
				{required}
				{readonly}
				{rows}
				{cols}
				{wrap}
				aria-controls={helperTextId}
				aria-describedby={helperTextId}
				aria-labelledby={labelId}
				on:input={valueUpdater}
				on:change={changeHandler}
				use:forwardDOMEvents />
		{/if}
		<NotchedOutline noLabel={!$$slots.label}>
			{#if $$slots.label}
				<FloatingLabel component={Span}>
					<slot name="label" />
				</FloatingLabel>
			{/if}
		</NotchedOutline>
	</label>
	<slot />
</div>

<UseTextField
	bind:this={useInputField}
	bind:value
	bind:invalid
	{ripple}
	{disabled}
	label={$$slots.label}
	{fullWidth}
	variant="outlined"
	bind:classList={textFieldClassList}
	{dom} />
