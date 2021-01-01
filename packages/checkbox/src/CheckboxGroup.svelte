<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { SelectableGroup } from "../../common/hoc";
	import { CheckboxGroupChangeEvent } from "./types";

	export let value: string[] = undefined;

	const dispatch = createEventDispatcher<{
		change: CheckboxGroupChangeEvent;
	}>();

	function handleChange() {
		dispatch("change", {
			value,
		});
	}
</script>

<svelte:options immutable={true} />

<SelectableGroup on:change={handleChange} bind:value nullable>
	<slot />
</SelectableGroup>
