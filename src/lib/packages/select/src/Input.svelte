<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { Input } from "./dom";
	import { getSelectContext } from "./SelectContext";
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
	const selectContext$ = getSelectContext();

	$: $selectContext$.setInputElement(dom);
	//#endregion
</script>

<Input
	bind:dom
	{id}
	class={className}
	{style}
	value={$selectContext$.value}
	{...$$restProps}
/>
