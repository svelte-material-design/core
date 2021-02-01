<script lang="ts">
	import type { SelectionType } from "@raythurnevoid/svelte-group-components/ts/selectable";

	export let selected: boolean;
	export let selectionType: SelectionType;
</script>

{#if selectionType === "multi"}
	<input style="display: none;" type="checkbox" checked={selected} />
{:else if selectionType === "single"}
	<input style="display: none;" type="radio" checked={selected} />
{/if}
