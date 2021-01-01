<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import { SelectableGroup } from "../../common/hoc";
	import { SwitchGroupChangeEvent } from "./";

	export let value: string[];

	const dispatch = createEventDispatcher<{
		change: SwitchGroupChangeEvent;
	}>();

	function handleChange() {
		dispatch("change", {
			value,
		});
	}
</script>

<SelectableGroup bind:value nullable on:change={handleChange}>
	<slot />
</SelectableGroup>
