<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLImageElement = undefined;
	//#endregion

	export let src: string;
	export let alt: string;
	//#endregion

	//#region implementation
	//#endregion
</script>

<img
	bind:this={dom}
	{id}
	class={classList([className, "mdc-image-list__image"])}
	{style}
	{src}
	{alt}
	{...$$restProps}
/>
