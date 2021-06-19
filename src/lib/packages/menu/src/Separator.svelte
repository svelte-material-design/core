<svelte:options immutable={true} />

<script lang="ts">
	//#region import
	import { Separator } from "../../list/src/dom";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
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
