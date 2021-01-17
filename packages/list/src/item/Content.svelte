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
	export let dom: HTMLSpanElement = undefined;
	//#endregion
	//#endregion

	//#region implementation
	//#endregion
</script>

<span
	bind:this={dom}
	{id}
	class={classList([className, "mdc-list-item__text"])}
	{style}
	{...$$restProps}>
	<slot />
</span>
