<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/menu-surface/MenuSurface:${count++}`;

	export let dom: HTMLDivElement = undefined;
	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// AbsoluteMenuSurface
	import {
		MenuSurfaceAnchorCorner,
		MenuSurfaceVariant,
		MDCMenuDistance,
	} from ".";
	import { MenuSurface } from "./internal";

	export let open: boolean = false;
	export let quickOpen: boolean = false;
	export let anchorCorner: MenuSurfaceAnchorCorner = undefined;
	export let anchorFlipRtl: boolean = true;
	export let anchorMargin: MDCMenuDistance = undefined;
	export let variant: MenuSurfaceVariant = undefined;
</script>

<MenuSurface
	bind:dom
	bind:open
	{...props}
	{id}
	class={className}
	{style}
	{quickOpen}
	{anchorCorner}
	{anchorFlipRtl}
	{anchorMargin}
	{variant}
>
	<slot />
</MenuSurface>
