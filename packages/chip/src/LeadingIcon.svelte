<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import type { GraphicDOM, GraphicType } from "../../common/components";
	import { getChipContext } from "./ChipContext";
	import { LeadingIcon } from "./dom";
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
	//#endregion

	//#region implementation
	const chipContext$ = getChipContext();

	$: hide = $chipContext$.isLeadingIconHidden;
	//#endregion
</script>

<LeadingIcon
	bind:dom
	{id}
	class={className}
	{style}
	{type}
	{hide}
	{...$$restProps}
>
	<slot />
</LeadingIcon>
