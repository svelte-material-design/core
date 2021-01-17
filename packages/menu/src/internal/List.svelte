<svelte:options immutable={true} />

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLUListElement = undefined;
	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = undefined;
	//#endregion

	// List
	//#region imports
	import { createEventDispatcher, tick } from "svelte";
	import {
		SelectionGroupBinding,
		SingleSelectionGroup,
	} from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { ListImpl, OnListActionEvent } from "../../../list/src/internal";
	import { ListOrientation, OnListChangeEvent, ListType } from "../../../list";
	//#endregion

	//#region exports
	export let orientation: ListOrientation = "vertical";
	export let type: ListType = "textual";
	export let itemsRows: number = 1;

	export let dense: boolean = false;
	export let density: number = 0;

	export let wrapFocus: boolean = true;
	export let value: string = undefined;
	export let group: SelectionGroupBinding;
	//#endregion

	const dispatch = createEventDispatcher<{
		change: OnListChangeEvent;
	}>();

	//#region local variables
	let selectionGroup: SingleSelectionGroup;
	//#endregion

	// Keep MDCList properties updated

	async function handleAction({
		targetIndex,
		listSelectedIndex,
	}: OnListActionEvent) {
		const item = selectionGroup.getItems()[targetIndex];

		if (!item) return;

		if (listSelectedIndex === targetIndex) {
			selectionGroup.setSelected(item, true);
		} else {
			selectionGroup.setSelected(item, false);
		}

		await tick();

		dispatch("change", {
			value,
		});
	}
</script>

<ListImpl
	bind:dom
	{props}
	{id}
	class={className}
	{style}
	role="menu"
	selectionType="single"
	{orientation}
	{itemsRows}
	{type}
	{dense}
	{density}
	{wrapFocus}
	{group}
	on:action={(event) => handleAction(event.detail)}
	disableMDCInstance
>
	<slot />
</ListImpl>
