<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { getFormFieldContext } from "./";
	import { onDestroy } from "svelte";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLLabelElement = undefined;
	//#endregion

	//#endregion

	//#region implementation
	const formFieldContext$ = getFormFieldContext();

	$: if (!id) id = `${$formFieldContext$.id}--label`;
	$: $formFieldContext$.setLabelId(id);

	onDestroy(() => {
		$formFieldContext$.setLabelId(undefined);
	}); //#endregion
</script>

<label
	bind:this={dom}
	{id}
	class={className}
	{style}
	for={$formFieldContext$.inputId}
	{...$$restProps}
>
	<slot />
</label>
