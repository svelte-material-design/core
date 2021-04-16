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
	export let dom: HTMLSpanElement = undefined;
	//#endregion
</script>

<span
	bind:this={dom}
	{...$$restProps}
	{id}
	class={classList([className, "mdc-button__label"])}
	{style}
	{...$$restProps}
>
	<slot />
</span>
