<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { classList } from "@raythurnevoid/strings-filter";
	import { getRowBehaviour } from "./RowContext";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLTableHeaderCellElement = undefined;
	//#endregion

	//#endregion

	//#region implementation
	const behaviour = getRowBehaviour();
	//#endregion
</script>

{#if behaviour == "header"}
	<div
		bind:this={dom}
		{id}
		class={classList([className, "mdc-data-table__header-cell-label"])}
		{style}
		{...$$restProps}
	>
		<slot />
	</div>
{:else}
	<slot />
{/if}
