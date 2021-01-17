<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { createEventDispatcher, tick } from "svelte";
	import {
		SelectionGroupBinding,
		SelectionGroup,
	} from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { ListImpl, OnListActionEvent } from "./internal";
	import type {
		ListOrientation,
		ListRole,
		OnListChangeEvent,
		ListType,
	} from ".";
	import { roleToSelectionType } from "./roleToSelectionType";
	import { setCreateCheckboxMDCIstance } from "../../checkbox";
	import { setCreateRadioMDCIstance } from "../../radio";
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
	export let orientation: ListOrientation = "vertical";
	export let type: ListType = "textual";
	export let itemsRows: number = 1;

	export let dense: boolean = false;
	export let density: number = 0;

	export let wrapFocus: boolean = true;
	export let value: string | string[] = undefined;

	export let group: SelectionGroupBinding = undefined;

	$: if (role == undefined) role = "list";
	$: if (role === "list") {
		value = undefined;
	}

	$: if (role === "group") {
		setCreateCheckboxMDCIstance(false);
	} else {
		setCreateCheckboxMDCIstance(false);
	}

	$: if (role === "radiogroup") {
		setCreateRadioMDCIstance(false);
	} else {
		setCreateRadioMDCIstance(true);
	}
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		change: OnListChangeEvent;
	}>();

	//#region local variables
	$: selectionType = roleToSelectionType(role);

	let selectionGroup: SelectionGroup;
	//#endregion

	async function handleAction({
		targetIndex,
		listSelectedIndex,
	}: OnListActionEvent) {
		if (selectionType) {
			const item = selectionGroup.getItems()[targetIndex];

			if (!item) return;

			if (
				(selectionType === "single" && listSelectedIndex === targetIndex) ||
				(selectionType === "multi" &&
					(listSelectedIndex as number[]).includes(targetIndex))
			) {
				selectionGroup.setSelected(item, true);
			} else {
				selectionGroup.setSelected(item, false);
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
	bind:this={selectionGroup}
	bind:value
	{selectionType}
	{group}
	let:group
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
		{density}
		{wrapFocus}
		{group}
		{...$$restProps}
		on:action={(event) => handleAction(event.detail)}
	>
		<slot />
	</ListImpl>
</SelectionGroup>
