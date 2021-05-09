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
	export let dom: HTMLDivElement = undefined;
	//#endregion

	//#endregion

	//#region implementation
	//#endregion
</script>

<table
	bind:this={dom}
	{id}
	class={classList([className, "mdc-data-table__table"])}
	{style}
	{...$$restProps}
>
	<slot />
</table>
