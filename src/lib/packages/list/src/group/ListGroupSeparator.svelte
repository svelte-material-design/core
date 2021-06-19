<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLHRElement = undefined;
	//#endregion

	//#endregion

	//#region implementation
	//#endregion
</script>

<hr
	bind:this={dom}
	{id}
	class={classList([className, "mdc-list-divider"])}
	{style}
	{...$$restProps}
/>
