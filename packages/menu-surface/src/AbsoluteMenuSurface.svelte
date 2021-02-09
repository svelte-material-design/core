<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/menu-surface/AbsoluteMenuSurface:${count++}`;

	export let dom: HTMLDivElement = undefined;
	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// AbsoluteMenuSurface
	import {
		MenuSurfaceAnchorCorner,
		MenuSurfaceVariant,
		MDCMenuDistance,
		AbsoluteMenuSurfacePosition,
	} from ".";
	import { MenuSurfaceImpl } from "./internal";
	import { Use } from "@raythurnevoid/svelte-hooks";

	export let open: boolean = false;
	export let quickOpen: boolean = false;
	export let anchorCorner: MenuSurfaceAnchorCorner = undefined;
	export let anchorFlipRtl: boolean = true;
	export let anchorMargin: MDCMenuDistance = undefined;
	export let variant: MenuSurfaceVariant = undefined;

	export let anchor: HTMLElement = undefined;
	export let position: AbsoluteMenuSurfacePosition = undefined;

	let menuSurfaceImpl: MenuSurfaceImpl = undefined;

	function setPosition() {
		const menuSurface = menuSurfaceImpl?.getMDCInstance();
		menuSurface.setAbsolutePosition(position.x, position.y);
	}
</script>

<MenuSurfaceImpl
	bind:this={menuSurfaceImpl}
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
	hoisted={true}
	on:open
	on:close
>
	<slot />
</MenuSurfaceImpl>

<Use effect hook={setPosition} when={!!position} />
