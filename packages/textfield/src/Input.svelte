<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { getInputFieldContext } from "./TextFieldContext";
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLInputElement = undefined;
	//#endregion

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
	on:input={$inputFieldContext$.valueUpdater}
	on:change={$inputFieldContext$.changeHandler}
/>
{#if $$slots.options}
	<datalist id={listId}>
		<slot name="options" />
	</datalist>
{/if}
