<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import type {
		MenuSurfaceAnchorCorner,
		MenuSurfaceVariant,
		MDCMenuDistance,
	} from ".";
	import { MenuSurface } from "./internal";
	import { onMount } from "svelte";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/menu-surface/MenuSurface:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let open: boolean = false;
	export let quickOpen: boolean = false;
	export let anchorCorner: MenuSurfaceAnchorCorner = undefined;
	export let anchorFlipRtl: boolean = true;
	export let anchorMargin: MDCMenuDistance = undefined;
	export let variant: MenuSurfaceVariant = undefined;
	//#endregion

	//#region implementation
	let anchor: HTMLElement;
	onMount(() => {
		anchor = dom.parentElement;
	});
	//#endregion
</script>

<MenuSurface
	bind:dom
	bind:open
	{id}
	class={className}
	{style}
	{quickOpen}
	{anchorCorner}
	{anchorFlipRtl}
	{anchorMargin}
	{variant}
	{anchor}
	{...$$restProps}
	on:open
	on:close
	on:closing
>
	<slot />
</MenuSurface>
