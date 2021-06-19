<svelte:options immutable={true} />

<script lang="ts">
	import { SelectionGroup } from "@raythurnevoid/svelte-group-components/selectable";
	import type {
		SelectionGroupBinding,
		OnSelectionGroupOptionsChangeEvent,
		OnSingleSelectionGroupChangeEvent,
	} from "@raythurnevoid/svelte-group-components/selectable";
	import { createEventDispatcher, onMount } from "svelte";
	import { setRadioGroupContext } from "./RadioContext";
	import type {
		OnRadioGroupChangeEvent,
		OnRadioGroupChildrenChangeEvent,
	} from "./types";

	export let value: string = undefined;
	export let group: SelectionGroupBinding = undefined;

	const dispatch = createEventDispatcher<{
		change: OnRadioGroupChangeEvent;
		optionsChange: OnRadioGroupChildrenChangeEvent;
	}>();

	let selectionGroup: SelectionGroup;

	const context$ = setRadioGroupContext();

	onMount(() => {
		$context$ = { ...$context$, group: group ?? selectionGroup.getBindings() };
	});

	function handleChange(event: OnSingleSelectionGroupChangeEvent) {
		dispatch("change", {
			...event,
		});
	}

	function handleOptionsChange(event: OnSelectionGroupOptionsChangeEvent) {
		dispatch("optionsChange", {
			items: event.items.map((i) => i.dom as HTMLDivElement),
		});
	}
</script>

<SelectionGroup
	selectionType="single"
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
