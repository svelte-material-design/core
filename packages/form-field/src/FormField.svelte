<script lang="ts" context="module">
	let counter: number = 0;
</script>

<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "../../common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = "";
	export let id: string = `@smui/form-field/FormField:${counter++}`;

	export let dom: HTMLDivElement = null;
	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// FormField
	import { MDCFormField } from "@material/form-field";
	import { onMount, onDestroy } from "svelte";
	import { FormFieldLabelAlign, createFormFieldContext } from "./";

	export let align: FormFieldLabelAlign = "start";
	export let noWrap: boolean = false;
	export let vertical: boolean = false;

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
</script>

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

<div
	bind:this={dom}
	{...props}
	class="mdc-form-field {className}
    {align === 'end' ? 'mdc-form-field--align-end' : ''}
    {noWrap ? 'mdc-form-field--nowrap' : ''}
    {vertical ? 'smui-form-field--vertical' : ''}"
	{style}
	use:forwardDOMEvents>
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

<!-- <div
  bind:this={element}
  use:useActions={use}
  use:forwardEvents
  class="
    mdc-form-field
    {className}
    {align === 'end' ? 'mdc-form-field--align-end' : ''}
  "
  {...exclude($$props, ['use', 'class', 'alignEnd', 'inputId', 'label$'])}
>
  <slot></slot>
  <label
    use:useActions={label$use}
    for={inputId}
    {...exclude(prefixFilter($$props, 'label$'), ['use'])}
  ><slot name="label"></slot></label>
</div> -->
