<svelte:options immutable={true} />

<script lang="ts">
	//#region Base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLDivElement = undefined;
	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// AbsoluteMenuSurface
	import {
		MenuSurfaceAnchorCorner,
		MenuSurfaceVariant,
		MDCMenuDistance,
	} from "..";
	import { MenuSurfaceImpl } from ".";
	import { onMount } from "svelte";

	export let open: boolean = false;
	export let quickOpen: boolean = false;
	export let anchorCorner: MenuSurfaceAnchorCorner = undefined;
	export let anchorFlipRtl: boolean = true;
	export let anchorMargin: MDCMenuDistance = undefined;
	export let variant: MenuSurfaceVariant = undefined;

	export let disableMDCInstance: boolean = false;

	let anchor: HTMLElement;
	onMount(() => {
		anchor = dom.parentElement;
	});
</script>

<MenuSurfaceImpl
	bind:dom
	bind:open
	{...props}
	{id}
	class={className}
	{style}
	{quickOpen}
	{anchor}
	{anchorCorner}
	{anchorFlipRtl}
	{anchorMargin}
	{variant}
	hoisted={false}
	{disableMDCInstance}
>
	<slot />
</MenuSurfaceImpl>
