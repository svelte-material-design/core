<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { SelectableGroup } from "../../../packages/common/hoc";
	import { RadioGroupChangeEvent } from "./";

	export let value: string = undefined;

	const dispatch = createEventDispatcher<{
		change: RadioGroupChangeEvent;
	}>();

	function handleChange() {
		dispatch("change", {
			value,
		});
	}
</script>

<svelte:options immutable={true} />

<SelectableGroup
	selectionType="single"
	bind:value
	on:change={handleChange}
	nullable>
	<slot />
</SelectableGroup>
