<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLLIElement = undefined;
	//#endregion

	export let insetPadding: boolean = false;
	export let insetLeading: boolean = false;
	export let insetTrailing: boolean = false;
	//#endregion

	//#region implementation
	//#endregion
</script>

<li
	bind:this={dom}
	{id}
	class={classList([
		className,
		"mdc-list-divider",
		[insetPadding, "mdc-list-divider--inset-padding"],
		[insetLeading, "mdc-list-divider--inset-leading"],
		[insetTrailing, "mdc-list-divider--inset-trailing"],
	])}
	{style}
	role="separator"
	{...$$restProps}
/>
