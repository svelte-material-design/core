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
	import type { OnListActionEvent } from "./internal";
	import type {
		ListOrientation,
		ListRole,
		OnListChangeEvent,
		ListItemsStyle,
	} from "./types";
	import { handleSelect, roleToSelectionType } from "./functions";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/list/List:${count++}`;
	export let dom: HTMLUListElement = undefined;
	//#endregion

	export let role: ListRole = "list";
	$: if (role == undefined) role = "list";
	$: if (role === "list") {
		value = undefined;
	}

	export let orientation: ListOrientation = "vertical";
	export let itemsStyle: ListItemsStyle = "textual";
	export let itemsRows: number = 1;
	export let dense: boolean = false;
	export let wrapFocus: boolean = true;
	export let value: string | string[] = undefined;

	export let group: SelectionGroupBinding = undefined;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		change: OnListChangeEvent;
	}>();

	$: selectionType = roleToSelectionType(role);
	let selectionGroup: SelectionGroup;

	async function handleAction({
		targetIndex,
		listSelectedIndex,
	}: OnListActionEvent) {
		if (selectionType) {
			const selectedIndexes = Array.isArray(listSelectedIndex)
				? listSelectedIndex
				: [listSelectedIndex];
			handleSelect({
				selectionType,
				selectionGroup,
				targetIndex,
				selectedIndexes,
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
	let:group
>
	<List
		bind:dom
		{id}
		class={className}
		{style}
		{role}
		{selectionType}
		{orientation}
		{itemsRows}
		{itemsStyle}
		{dense}
		{wrapFocus}
		{group}
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
