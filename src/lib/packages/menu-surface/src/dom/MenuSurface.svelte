<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import type { MenuSurfaceVariant } from "../types";
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

	export let open: boolean = false;
	export let variant: MenuSurfaceVariant = undefined;
	//#endregion
</script>

<div
	bind:this={dom}
	{id}
	class={classList([
		className,
		"mdc-menu-surface",
		[variant === "fixed", "mdc-menu-surface--fixed"],
		[open, "mdc-menu-surface--open"],
		[variant === "fullwidth", "mdc-menu-surface--fullwidth"],
	])}
	{style}
	{...$$restProps}
>
	<slot />
</div>
