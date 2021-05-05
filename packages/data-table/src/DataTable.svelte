<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import {
		MDCDataTable,
		MDCDataTableRowSelectionChangedEventDetail,
		SortActionEventDetail,
	} from "@material/data-table";
	import { onMount, onDestroy, createEventDispatcher } from "svelte";
	import { SelectableGroup } from "../../common/hoc";
	import { getDialogContext } from "../../dialog";
	import { setDataTableContext } from "./DataTableContext";
	import type { SortEventDetail } from ".";
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/data-table/DataTable:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	// TODO: radio single selection table, figure out how to handle pagination and selection (maybe specific component?), allow sort deactivation.
	export let value: string = undefined;
	export let ariaLabel: string = undefined;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		sort: SortEventDetail;
	}>();
	setDataTableContext({
		syncDom() {
			dataTable?.layout();
		},
	});

	let selectableGroup: SelectableGroup;

	const dialogContext$ = getDialogContext();

	let dataTable: MDCDataTable;
	onMount(async () => {
		dataTable = new MDCDataTable(dom);

		dataTable.listen("MDCDataTable:rowSelectionChanged", handleChange);
		dataTable.listen("MDCDataTable:selectedAll", selectAllRows);
		dataTable.listen("MDCDataTable:unselectedAll", unselectAllRows);
		dataTable.listen("MDCDataTable:sorted", handleSort);
	});

	// Redraw on dialog opened
	$: if (dataTable && $dialogContext$?.isOpen) dataTable.layout();

	onDestroy(() => {
		if (dataTable) {
			(dataTable as any).headerRowCheckbox = { destroy() {} }; // Workaround for MDCDataTable bug on destroy
			(dataTable as any).rowCheckboxList = []; // Workaround for MDCDataTable bug on destroy

			dataTable.destroy();
		}
	});

	function handleSort(event: CustomEvent<SortActionEventDetail>) {
		dispatch("sort", event.detail as SortEventDetail);
	}

	function handleChange(
		event: CustomEvent<MDCDataTableRowSelectionChangedEventDetail>
	) {
		selectableGroup.setItemSelected(
			event.detail.rowIndex,
			event.detail.selected
		);
	}

	function selectAllRows() {
		selectableGroup.selectAll();
	}

	function unselectAllRows() {
		selectableGroup.unselectAll();
	}
	//#endregion
</script>

<div
	bind:this={dom}
	class={classList([className, "mdc-data-table"])}
	{style}
	{id}
	{...$$restProps}
>
	<SelectableGroup bind:this={selectableGroup} bind:value>
		<table class="mdc-data-table__table" aria-label={ariaLabel}>
			<slot />
		</table>
	</SelectableGroup>

	<slot name="loader" />

	<div class="smui-data-table__pagination">
		<slot name="pagination" />
	</div>
</div>

<style>
	.smui-data-table__pagination {
		/* Why in hell would MDC put 4px randomly... */
		padding-left: calc(1em - 4px);
	}
</style>
