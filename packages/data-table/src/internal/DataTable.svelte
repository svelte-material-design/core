<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { MDCDataTable } from "@material/data-table";
	import type {
		MDCDataTableRowSelectionChangedEventDetail,
		SortActionEventDetail,
	} from "@material/data-table";
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { getDialogContext } from "../../../dialog";
	import { setDataTableContext } from "../DataTableContext";
	import type { OnDataTableAction, OnDataTableSort } from "..";
	import { classList } from "@raythurnevoid/strings-filter";
	import type {
		SelectionGroup,
		SelectionGroupBinding,
	} from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type { OnDataTableSelect } from "./types";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	// TODO: radio single selection table, figure out how to handle pagination and selection (maybe specific component?), allow sort deactivation.
	export let selectionGroupBindings: SelectionGroupBinding;
	export let selectionGroup: SelectionGroup;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		sort: OnDataTableSort;
		select: OnDataTableSelect;
		selectAll: OnDataTableAction;
		unselectAll: OnDataTableAction;
	}>();

	let dataTable: MDCDataTable;
	let reinitializeDebounce: ReturnType<typeof setTimeout>;

	const context$ = setDataTableContext({
		syncDom() {
			dataTable?.layout();
		},
		reinitialize() {
			clearTimeout(reinitializeDebounce);
			reinitializeDebounce = setTimeout(() => {
				initialize();
			});
		},
		layout() {
			dataTable?.layout();
		},
	});

	$: $context$ = { ...$context$, selectionGroup: selectionGroupBindings };

	const dialogContext$ = getDialogContext();

	onMount(async () => {
		initialize();
	});

	// Redraw on dialog opened
	$: if (dataTable && $dialogContext$?.isOpen) dataTable.layout();

	onDestroy(() => {});

	function initialize() {
		destroy();
		if (dom) {
			dataTable = new MDCDataTable(dom);

			dataTable.listen("MDCDataTable:rowSelectionChanged", handleChange);
			dataTable.listen("MDCDataTable:selectedAll", selectAllRows);
			dataTable.listen("MDCDataTable:unselectedAll", unselectAllRows);
			dataTable.listen("MDCDataTable:sorted", handleSort);
		}
	}

	function destroy() {
		if (dataTable) {
			(dataTable as any).headerRowCheckbox = { destroy() {} }; // Workaround for MDCDataTable bug on destroy
			(dataTable as any).rowCheckboxList = []; // Workaround for MDCDataTable bug on destroy

			dataTable.destroy();
		}
	}

	function handleSort(event: CustomEvent<SortActionEventDetail>) {
		dispatch("sort", event.detail as OnDataTableSort);
	}

	async function handleChange(
		event: CustomEvent<MDCDataTableRowSelectionChangedEventDetail>
	) {
		const selectedItem = selectionGroup.getItems()[event.detail.rowIndex];
		selectionGroup.setSelected(selectedItem, event.detail.selected);

		await tick();

		dispatch("select", {
			dom,
			rowIndex: event.detail.rowIndex,
			selected: event.detail.selected,
		});
	}

	async function selectAllRows() {
		selectionGroup.getItems().forEach((item) => {
			selectionGroup.setSelected(item, true);
		});

		await tick();

		dispatch("selectAll", {
			dom,
		});
	}

	async function unselectAllRows() {
		selectionGroup.getItems().forEach((item) => {
			selectionGroup.setSelected(item, false);
		});

		await tick();

		dispatch("unselectAll", {
			dom,
		});
	}
	//#endregion
</script>

<div
	bind:this={dom}
	class={classList([className, "mdc-data-table"])}
	{style}
	{id}
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
	<slot />
</div>
