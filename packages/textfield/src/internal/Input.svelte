<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { getInputFieldContext } from "../TextFieldContext";
	import { classList } from "@raythurnevoid/strings-filter";
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

	$: inputId = id ?? `${$inputFieldContext$.id}--input`;
	$: listId = $$slots.options
		? `${$inputFieldContext$.id}--datalist`
		: undefined;
	$: $inputFieldContext$.setInputId(inputId);
	$: $inputFieldContext$.setInputElement(dom);
	//#endregion
</script>

{#if textArea}
	<textarea
		bind:this={dom}
		{id}
		class={classList([className, "mdc-text-field__input"])}
		{style}
		aria-controls={$inputFieldContext$.helperTextId}
		aria-describedby={$inputFieldContext$.helperTextId}
		aria-labelledby={$inputFieldContext$.labelId}
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
{:else}
	<input
		bind:this={dom}
		id={inputId}
		class={classList([className, "mdc-text-field__input"])}
		{style}
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
{/if}
