<script lang="ts">
	import type { SelectionType } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type { ItemRole } from "./types";

	export let selected: boolean;
	export let selectionType: SelectionType;
	export let role: ItemRole;
</script>

{#if role === "radio" || role === "checkbox"}
	{#if selectionType === "multi"}
		<input style="display: none;" type="checkbox" checked={selected} />
	{:else if selectionType === "single"}
		<input style="display: none;" type="radio" checked={selected} />
	{/if}
{/if}
