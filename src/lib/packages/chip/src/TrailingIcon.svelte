<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import type { GraphicDOM, GraphicType } from "../../common/components";
	import { onMount, tick } from "svelte";
	import { getChipContext } from "./ChipContext";
	import { TrailingIcon } from "./dom";
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
	const chipContext$ = getChipContext();

	$: isButton =
		action === undefined ? $chipContext$.removeOnTrailingIconClick : action;

	onMount(async () => {
		await tick();
		$chipContext$?.reinitialize();
	});
	//#endregion
</script>

<TrailingIcon
	bind:dom
	{id}
	class={className}
	{style}
	{type}
	action={isButton}
	{...$$restProps}
>
	<slot />
</TrailingIcon>
