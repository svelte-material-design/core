<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { onMount } from "svelte";
	import { getDataTableContext } from "./DataTableContext";
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLTableCellElement = undefined;
	//#endregion

	export let numeric: boolean = false;
	export let checkbox: boolean = false;
	//#endregion

	//#region implementation
	const dataTableContext$ = getDataTableContext();

	onMount(() => {
		if (checkbox) {
			// This will prevent MDCDataTable to broke itself if previously there was no checkbox
			$dataTableContext$?.syncDom();
		}
	});
	//#endregion
</script>

<td
	bind:this={dom}
	{id}
	class={classList([
		className,
		"mdc-data-table__cell",
		[numeric, "mdc-data-table__cell--numeric"],
		[checkbox, "mdc-data-table__cell--checkbox"],
	])}
	{style}
	{...$$restProps}
>
	<slot />
</td>
