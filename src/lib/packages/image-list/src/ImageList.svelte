<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region imports
	import type { ImageListVariant } from "./types";
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/image-list/ImageList:${count++}`;
	export let dom: HTMLUListElement = undefined;
	//#endregion

	export let variant: ImageListVariant = "standard";
	export let textProtection: boolean = false;
	//#endregion

	//#region implementation
	//#endregion
</script>

<ul
	bind:this={dom}
	{id}
	class={classList([
		className,
		"mdc-image-list",
		[variant === "masonry", "mdc-image-list--masonry"],
		[textProtection, "mdc-image-list--with-text-protection"],
	])}
	style={classList([style])}
	{...$$restProps}
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur
	on:focusin
	on:focusout
>
	<slot />
</ul>
