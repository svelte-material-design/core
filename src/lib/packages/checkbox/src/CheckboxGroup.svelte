<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { SelectionGroup } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type {
		SelectionGroupBinding,
		OnSelectionGroupOptionsChangeEvent,
		OnMultiSelectionGroupChangeEvent,
	} from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { createEventDispatcher, onMount } from "svelte";
	import { setCheckboxGroupContext } from "./CheckboxContext";
	import type {
		OnCheckboxGroupChangeEvent,
		OnCheckboxGroupChildrenChangeEvent,
	} from "./types";
	//#endregion

	//#region exports
	//#region base

	//#endregion

	export let value: string[] = undefined;
	export let group: SelectionGroupBinding = undefined;
	//#endregion

	//#region implementation
	const dispatch =
		createEventDispatcher<{
			change: OnCheckboxGroupChangeEvent;
			optionsChange: OnCheckboxGroupChildrenChangeEvent;
		}>();

	let selectionGroup: SelectionGroup;

	const context$ = setCheckboxGroupContext();

	onMount(() => {
		$context$ = { ...$context$, group: group ?? selectionGroup.getBindings() };
	});

	function handleChange(event: OnMultiSelectionGroupChangeEvent) {
		dispatch("change", {
			...event,
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
	selectionType="multi"
	bind:this={selectionGroup}
	{group}
	bind:value
	nullable
	on:change={(e) => handleChange(e.detail)}
	on:optionsChange={(e) => handleOptionsChange(e.detail)}
	let:group
>
	<slot {group} />
</SelectionGroup>
