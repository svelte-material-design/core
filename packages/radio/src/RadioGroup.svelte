<svelte:options immutable={true} />

<script lang="ts">
	import { SelectionGroup } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type {
		SelectionGroupBinding,
		OnSelectionGroupOptionsChangeEvent,
		OnSingleSelectionGroupChangeEvent,
	} from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { onMount } from "svelte";
	import { setRadioGroupContext } from "./RadioContext";
	import type {
		OnRadioGroupChangeEvent,
		OnRadioGroupChildrenChangeEvent,
	} from "./types";

	export let value: string[] = undefined;
	export let group: SelectionGroupBinding = undefined;

	const dispatch = createEventDispatcher<{
		change: OnRadioGroupChangeEvent;
		optionsChange: OnRadioGroupChildrenChangeEvent;
	}>();

	let selectionGroup: SelectionGroup;

	const context$ = setRadioGroupContext();
	$: $context$ = { ...$context$, group };

	onMount(() => {
		$context$.group = group ?? selectionGroup.getBindings();
	});

	function handleChange(event: OnSingleSelectionGroupChangeEvent) {
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
	selectionType="single"
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
