<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import type {
		MenuSurfaceAnchorCorner,
		MenuSurfaceVariant,
		MenuSurfaceAnchorMargin,
	} from ".";
	import { MenuSurface } from "./internal";
	import { onMount, tick } from "svelte";
	import type { MenuSurfaceAnchor } from "./types";
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
	export let anchorMargin: MenuSurfaceAnchorMargin = undefined;
	export let variant: MenuSurfaceVariant = undefined;
	export let hoisted: boolean = false;
	export let anchor: MenuSurfaceAnchor;
	//#endregion

	//#region implementation
	onMount(async () => {
		await tick();

		anchor = anchor ?? dom.parentElement;
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
	{hoisted}
	{anchor}
	{...$$restProps}
	on:open
	on:close
	on:closing
>
	<slot />
</MenuSurface>
