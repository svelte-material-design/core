<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { createEventDispatcher, tick } from "svelte";
	import { SelectionGroup } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type {
		SelectionGroupBinding,
		SelectionType,
	} from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { List } from "./internal";
	import type { OnListActionEvent } from "./internal";
	import type {
		ListOrientation,
		OnListChangeEvent,
		ListItemsStyle,
	} from "./types";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/list/List:${count++}`;
	export let dom: HTMLUListElement = undefined;
	//#endregion

	export let orientation: ListOrientation = "vertical";
	export let itemsStyle: ListItemsStyle = "textual";
	export let itemsRows: number = 1;
	export let dense: boolean = false;
	export let wrapFocus: boolean = true;
	export let value: string | string[] = undefined;
	export let multiSelection: boolean = false;

	export let group: SelectionGroupBinding = undefined;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		change: OnListChangeEvent;
	}>();

	//#region local variables
	$: selectionType = (multiSelection ? "multi" : "single") as SelectionType;

	let selectionGroupComponent: SelectionGroup;
	//#endregion

	async function handleAction({
		targetIndex,
		listSelectedIndex,
	}: OnListActionEvent) {
		if (selectionType) {
			const item = selectionGroupComponent.getItems()[targetIndex];

			if (!item) return;

			if (
				(selectionType === "single" && listSelectedIndex === targetIndex) ||
				(selectionType === "multi" &&
					(listSelectedIndex as number[]).includes(targetIndex))
			) {
				selectionGroupComponent.setSelected(item, true);
			} else {
				selectionGroupComponent.setSelected(item, false);
			}

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
	bind:this={selectionGroupComponent}
	bind:value
	{selectionType}
	{group}
	let:group
>
	<List
		bind:dom
		{id}
		class={className}
		{style}
		role="listbox"
		{selectionType}
		{orientation}
		{itemsRows}
		{itemsStyle}
		{dense}
		{wrapFocus}
		{group}
		aria-multiselectable={multiSelection ? true : undefined}
		{...$$restProps}
		on:action={(event) => handleAction(event.detail)}
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
