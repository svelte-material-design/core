<svelte:options immutable={true} />

<script lang="ts">
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

	export let value: string[] = undefined;
	export let group: SelectionGroupBinding = undefined;

	const dispatch = createEventDispatcher<{
		change: OnCheckboxGroupChangeEvent;
		optionsChange: OnCheckboxGroupChildrenChangeEvent;
	}>();

	let selectionGroup: SelectionGroup;

	const context$ = setCheckboxGroupContext();
	$: $context$ = { ...$context$, group };

	onMount(() => {
		$context$.group = group ?? selectionGroup.getBindings();
	});

	function handleChange(event: OnMultiSelectionGroupChangeEvent) {
		dispatch("change", {
			...event,
		});
	}

	function handleOptionsChange(event: OnSelectionGroupOptionsChangeEvent) {
		dispatch("optionsChange", {
			...event,
		});
	}
</script>

<SelectionGroup
	selectionType="multi"
	bind:this={selectionGroup}
	{group}
	bind:value
	nullable
	on:change={handleChange}
	on:optionsChange={handleOptionsChange}
	let:group
>
	<slot {group} />
</SelectionGroup>
