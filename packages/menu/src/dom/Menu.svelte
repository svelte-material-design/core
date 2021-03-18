<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { MenuSurface } from "../../../menu-surface/src/dom";
	import type { MenuVariant } from "..";
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	//#region menu surface
	export let open: boolean = false;
	export let variant: MenuVariant = undefined;
	//#endregion

	//#endregion

	//#region implementation
	//#endregion
</script>

<MenuSurface
	bind:dom
	{id}
	class={classList([className, "mdc-menu"])}
	{style}
	{open}
	{variant}
	{...$$restProps}
>
	<slot />
</MenuSurface>
