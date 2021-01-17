<svelte:options immutable={true} />

<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { SelectableGroup } from "../../common/hoc";
	import type { OnCheckboxGroupChangeEvent } from "./types";

	export let value: string[] = undefined;

	const dispatch = createEventDispatcher<{
		change: OnCheckboxGroupChangeEvent;
	}>();

	function handleChange() {
		dispatch("change", {
			value,
		});
	}
</script>

<SelectableGroup on:change={handleChange} bind:value nullable>
	<slot />
</SelectableGroup>
