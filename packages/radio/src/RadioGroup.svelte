<svelte:options immutable={true} />

<script lang="ts">
	import { SelectionGroup } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { onMount } from "svelte";
	import { setRadioGroupContext } from "./RadioContext";

	export let value: string[] = undefined;
	export let group: SelectionGroupBinding = undefined;

	let selectionGroup: SelectionGroup;

	const context$ = setRadioGroupContext();
	$: $context$ = { ...$context$, group };

	onMount(() => {
		$context$.group = group ?? selectionGroup.getBindings();
	});
</script>

<SelectionGroup
	selectionType="single"
	bind:this={selectionGroup}
	{group}
	bind:value
	nullable
	on:change
	on:optionsChange
	let:group
>
	<slot {group} />
</SelectionGroup>
