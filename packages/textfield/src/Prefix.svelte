<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { classList } from "@raythurnevoid/strings-filter";
	import { getInputFieldContext } from "./TextFieldContext";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLSpanElement = undefined;
	//#endregion

	//#endregion

	//#region implementation
	const inputFieldContext$ = getInputFieldContext();
	//#endregion
</script>

<span
	bind:this={dom}
	{id}
	class={classList([
		className,
		[!$inputFieldContext$.textArea, "mdc-text-field__affix"],
		"mdc-text-field__affix--prefix",
	])}
	{style}
	{...$$restProps}><slot /></span
>
