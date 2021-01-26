<svelte:options immutable={true} />

<script lang="ts">
	import {
		SelectionGroup,
		SelectionGroupBinding,
	} from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { onMount } from "svelte";
	import { setCheckboxGroupContext } from "./CheckboxContext";

	export let value: string[] = undefined;
	export let group: SelectionGroupBinding = undefined;

	let selectionGroup: SelectionGroup;

	const context$ = setCheckboxGroupContext();
	$: $context$ = { ...$context$, group };

	onMount(() => {
		$context$.group = group ?? selectionGroup.getBindings();
	});
</script>

<SelectionGroup
	selectionType="multi"
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
