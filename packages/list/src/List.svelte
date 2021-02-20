<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { createEventDispatcher, tick } from "svelte";
	import { SelectionGroup } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { List } from "./internal";
	import type {
		ListOrientation,
		OnListChangeEvent,
		ListItemsStyle,
		ListSelectionType,
		OnListActionEvent,
	} from "./types";
	import { handleSelect } from "./functions";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/list/List:${count++}`;
	export let dom: HTMLUListElement = undefined;
	//#endregion

	export let selectionType: ListSelectionType = undefined;

	export let orientation: ListOrientation = "vertical";
	export let itemsStyle: ListItemsStyle = "textual";
	export let itemsRows: number = 1;
	export let dense: boolean = false;
	export let wrapFocus: boolean = true;
	export let typeahead: boolean = false;
	export let value: string | string[] = undefined;

	export let group: SelectionGroupBinding = undefined;
	export let nullable: boolean = true;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		change: OnListChangeEvent;
	}>();

	let selectionGroup: SelectionGroup;

	async function handleAction({ itemIndex }: OnListActionEvent) {
		if (selectionType) {
			handleSelect({
				selectionType,
				selectionGroup,
				itemIndex,
			});

			await tick();

			dispatch("change", {
				dom,
				value,
			});
		}
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
	<List
		bind:dom
		{id}
		class={className}
		{style}
		{selectionType}
		{orientation}
		{itemsRows}
		{itemsStyle}
		{dense}
		{wrapFocus}
		{typeahead}
		{group}
		{...$$restProps}
		on:action={(event) => handleAction(event.detail)}
		on:action
		on:click
		on:mousedown
		on:mouseup
		on:keydown
		on:keyup
		on:focusin
		on:focusout
		on:optionsChange
	>
		<slot />
	</List>
</SelectionGroup>
