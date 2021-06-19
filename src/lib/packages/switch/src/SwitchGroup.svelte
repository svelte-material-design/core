<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { createEventDispatcher } from "svelte";
	import type { OnSwitchGroupChildrenChange, OnSwitchGroupChange } from "./";
	import { SelectionGroup } from "@raythurnevoid/svelte-group-components/selectable";
	import type {
		SelectionGroupBinding,
		OnMultiSelectionGroupChangeEvent,
		OnSelectionGroupOptionsChangeEvent,
	} from "@raythurnevoid/svelte-group-components/selectable";
	import { SwitchGroup } from "./internal";
	import type { SwitchGroupValue, SwitchGroupSelectionType } from "./types";
	//#endregion

	//#region exports
	//#region base

	//#endregion

	export let selectionType: SwitchGroupSelectionType = "multi";
	export let nullable: boolean = true;
	export let value: SwitchGroupValue;
	export let group: SelectionGroupBinding;
	//#endregion

	//#region implementation
	const dispatch =
		createEventDispatcher<{
			change: OnSwitchGroupChange;
			optionsChange: OnSwitchGroupChildrenChange;
		}>();

	let selectionGroup: SelectionGroup;

	function handleChange(event: OnMultiSelectionGroupChangeEvent) {
		dispatch("change", {
			value: event.value,
		});
	}

	function handleOptionsChange(event: OnSelectionGroupOptionsChangeEvent) {
		dispatch("optionsChange", {
			items: event.items.map((i) => i.dom as HTMLDivElement),
		});
	}
	//#endregion
</script>

<SelectionGroup
	{selectionType}
	bind:this={selectionGroup}
	{group}
	bind:value
	{nullable}
	on:change={(e) => handleChange(e.detail)}
	on:optionsChange={(e) => handleOptionsChange(e.detail)}
	let:group
>
	<SwitchGroup {group} let:group>
		<slot {group} />
	</SwitchGroup>
</SelectionGroup>
