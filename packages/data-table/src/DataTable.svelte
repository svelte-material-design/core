<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import type { DataTableValue, OnDataTableChange } from "./types";
	import { SelectionGroup } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type {
		SelectionType,
		SelectionGroupBinding,
	} from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { DataTable } from "./internal";
	import { createEventDispatcher, tick } from "svelte";
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
	export let value: DataTableValue = undefined;
	export let group: SelectionGroupBinding = undefined;
	export let nullable: boolean = true;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		change: OnDataTableChange;
	}>();

	let selectionGroup: SelectionGroup;
	let selectionType: SelectionType = "multi";

	async function handleChange() {
		dispatch("change", { dom, value });
	}
	//#endregion
</script>

<SelectionGroup
	bind:this={selectionGroup}
	bind:value
	{selectionType}
	{group}
	{nullable}
	let:group
>
	<DataTable
		bind:dom
		{id}
		{className}
		{style}
		{selectionGroup}
		selectionGroupBindings={group}
		{...$$restProps}
		on:select={handleChange}
		on:selectAll={handleChange}
		on:unselectAll={handleChange}
		on:sort
		on:selectAll
		on:unselectAll
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
	</DataTable>
</SelectionGroup>
