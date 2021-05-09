<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { onMount } from "svelte";
	import {
		getDataTableContext,
		createHeadCellContext,
		SortDirection,
	} from "./";
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLTableHeaderCellElement = undefined;
	//#endregion

	export let numeric: boolean = false;
	export let checkbox: boolean = false;
	//export let sort: "ascending" | "descending" | "none" = undefined;
	export let sortAriaLabel: string = undefined;
	export let columnId: string = undefined;
	//#endregion

	//#region implementation
	let sort: boolean = false;
	let sortDirection: SortDirection = "none";

	const dataTableContext$ = getDataTableContext();
	createHeadCellContext({
		setSort(enabled: boolean) {
			sort = enabled;
		},
		setSortDirection(direction: SortDirection) {
			sortDirection = direction;
		},
	});

	onMount(() => {
		if (checkbox) {
			// This will prevent MDCDataTable to broke itself if previously there was no checkbox
			$dataTableContext$?.syncDom();
		}
	});
	//#endregion
</script>

<th
	bind:this={dom}
	{id}
	class={classList([
		className,
		"mdc-data-table__header-cell",
		[sort, "mdc-data-table__header-cell--with-sort"],
		[
			sort && (sortDirection === "ascending" || sortDirection == "descending"),
			"mdc-data-table__header-cell--sorted",
		],
		[checkbox, "mdc-data-table__header-cell--checkbox"],
		[numeric, "mdc-data-table__header-cell--numeric"],
	])}
	{style}
	role="columnheader"
	scope="col"
	aria-sort={sort}
	data-column-id={columnId || id}
	{...$$restProps}
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur
	on:focusin
	on:focusout
>
	<div class="mdc-data-table__header-cell-wrapper">
		<slot />
	</div>
</th>
