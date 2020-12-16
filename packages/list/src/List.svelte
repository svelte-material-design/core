<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/List:${count++}`;

	export let dom: HTMLDivElement | HTMLUListElement = undefined;
	import { BaseProps } from "../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// List
	//#region imports
	import { createEventDispatcher, tick } from "svelte";
	import {
		SelectionGroupBinding,
		SingleSelectionGroup,
		MultiSelectionGroup,
	} from "../../common/selectable";
	import { ListImpl, OnListActionEvent } from "./internal";
	import { ListOrientation, ListRole, OnListChangeEvent, ListType } from ".";
	import { roleToSelectionType } from "./roleToSelectionType";
	import { setCreateCheckboxMDCIstance } from "../../../packages/checkbox";
	import { setCreateRadioMDCIstance } from "../../../packages/radio";
	//#endregion

	//#region exports
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
		setCreateCheckboxMDCIstance(true);
	}

	$: if (role === "radiogroup") {
		setCreateRadioMDCIstance(false);
	} else {
		setCreateRadioMDCIstance(true);
	}
	//#endregion

	const dispatch = createEventDispatcher<{
		change: OnListChangeEvent;
	}>();

	//#region local variables
	$: selectionType = roleToSelectionType(role);

	let selectionGroup: SingleSelectionGroup | MultiSelectionGroup;
	//#endregion

	// Keep MDCList properties updated

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

	$: component = selectionType
		? selectionType === "single"
			? SingleSelectionGroup
			: MultiSelectionGroup
		: undefined;
</script>

{#if selectionType && !group}
	<svelte:component
		this={component}
		bind:this={selectionGroup}
		bind:value
		let:group>
		<ListImpl
			bind:dom
			{props}
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
			on:action={(event) => handleAction(event.detail)}>
			<slot />
		</ListImpl>
	</svelte:component>
{:else}
	<ListImpl
		bind:dom
		{props}
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
		on:action={(event) => handleAction(event.detail)}>
		<slot />
	</ListImpl>
{/if}
