<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region imports
	import { MDCFormField } from "@material/form-field";
	import { onMount, onDestroy } from "svelte";
	import { FormFieldLabelAlign, createFormFieldContext } from "./";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/form-field/FormField:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let align: FormFieldLabelAlign = "start";
	export let noWrap: boolean = false;
	export let vertical: boolean = false;
	//#endregion

	//#region implementation
	let labelId: string;
	$: labelId = `${id}--label`;

	let inputId: string;
	const context$ = createFormFieldContext({
		labelId,
		inputId,
		id,
		setInput(value) {
			formField.input = value;
		},
		setInputId(value: string) {
			inputId = value;
		},
		setLabelId(value: string) {
			labelId = value;
		},
	});

	$: $context$ = { ...$context$, labelId, inputId, id };

	let formField: MDCFormField;
	onMount(() => {
		formField = new MDCFormField(dom);
	});

	onDestroy(() => {
		formField && formField.destroy();
	});
	//#endregion
</script>

<div
	bind:this={dom}
	{id}
	class="mdc-form-field {className}
    {align === 'end'
		? 'mdc-form-field--align-end'
		: ''}
    {noWrap ? 'mdc-form-field--nowrap' : ''}
    {vertical
		? 'smui-form-field--vertical'
		: ''}"
	{style}
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
	{#if $$slots.label}
		{#if inputId}
			<label id={labelId} for={inputId}>
				<slot name="label" />
			</label>
		{:else}
			<span id={labelId}>
				<slot name="label" />
			</span>
		{/if}
	{/if}
</div>

<style lang="scss">
	.smui-form-field--vertical {
		display: flex;
		flex-direction: column;

		&.mdc-form-field--align-end {
			> label {
				margin-left: 0;
				margin-right: auto;
			}
		}
	}
</style>
