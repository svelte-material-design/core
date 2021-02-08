<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	// Separator
	import { Separator } from "./dom";
	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/list/Separator:${count++}`;
	export let dom: HTMLLIElement = undefined;
	//#endregion

	export let insetLeading: boolean = false;
	export let insetTrailing: boolean = false;
	export let insetPadding: boolean = false;
	//#endregion

	//#region implementation
	//#endregion
</script>

<Separator
	bind:dom
	{id}
	class={className}
	{style}
	{insetPadding}
	{insetLeading}
	{insetTrailing}
	{...$$restProps}
/>
