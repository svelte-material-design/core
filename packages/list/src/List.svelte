<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { createEventDispatcher, tick } from "svelte";
	import { SelectionGroup } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { ListImpl, OnListActionEvent } from "./internal";
	import type {
		ListOrientation,
		ListRole,
		OnListChangeEvent,
		ListType,
	} from ".";
	import { roleToSelectionType } from "./roleToSelectionType";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/list/List:${count++}`;
	export let dom: HTMLDivElement | HTMLUListElement = undefined;
	//#endregion

	export let role: ListRole = "list";
	$: if (role == undefined) role = "list";
	$: if (role === "list") {
		value = undefined;
	}

	export let orientation: ListOrientation = "vertical";
	export let type: ListType = "textual";
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

	//#region local variables
	$: selectionType = roleToSelectionType(role);

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
	let:group={selectionGroup}
>
	<ListImpl
		bind:dom
		{id}
		class={className}
		{style}
		{role}
		{selectionType}
		{orientation}
		{itemsRows}
		{type}
		{dense}
		{wrapFocus}
		{selectionGroup}
		{...$$restProps}
		on:action={(event) => handleAction(event.detail)}
	>
		<slot />
	</ListImpl>
</SelectionGroup>
