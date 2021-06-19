<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import type { GraphicDOM, GraphicType } from "../../common/components";
	import { TrailingIcon } from "../../chip/src";
	import { onMount } from "svelte";
	import { getChipSetContext } from "./ChipSetContext";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: GraphicDOM = undefined;
	//#endregion

	export let type: GraphicType = "icon";
	export let action: boolean = false;
	//#endregion

	//#region implementation
	const chipSetContext$ = getChipSetContext();

	onMount(async () => {
		$chipSetContext$?.reinitialize();
	});
	//#endregion
</script>

<TrailingIcon
	bind:dom
	{id}
	class={className}
	{style}
	{type}
	{action}
	{...$$restProps}
>
	<slot />
</TrailingIcon>
