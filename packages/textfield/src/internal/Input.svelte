<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { Input } from "../dom";
	import { getInputFieldContext } from "../TextFieldContext";
	import {
		Input as InputDOM,
		TextArea as TextAreaDOM,
	} from "../../../common/dom";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLInputElement | HTMLTextAreaElement = undefined;
	//#endregion

	export let textArea: boolean = false;
	//#endregion

	//#region implementation
	const inputFieldContext$ = getInputFieldContext();

	$: id = id ?? `${$inputFieldContext$.id}--input`;
	$: listId = $$slots.options
		? `${$inputFieldContext$.id}--datalist`
		: undefined;
	$: $inputFieldContext$.setInputId(id);
	$: $inputFieldContext$.setInputElement(dom);
	//#endregion
</script>

<Input
	bind:dom
	{id}
	class={className}
	{style}
	component={textArea ? TextAreaDOM : InputDOM}
	aria-controls={$inputFieldContext$.helperTextId}
	aria-describedby={$inputFieldContext$.helperTextId}
	aria-labelledby={$inputFieldContext$.labelId}
	list={listId}
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
/>
{#if $$slots.options}
	<datalist id={listId}>
		<slot name="options" />
	</datalist>
{/if}
