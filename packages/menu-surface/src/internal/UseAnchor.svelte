<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { UseState } from "@raythurnevoid/svelte-hooks/ts";

	export let anchor: HTMLElement;

	const dispatch = createEventDispatcher<{ change: void }>();

	onMount(async () => {
		if (anchor) {
			await tick();
			handleAnchorChange(null);
		}
	});

	onDestroy(() => {
		anchor?.classList.remove("mdc-menu-surface--anchor");
	});

	function handleAnchorChange(oldAnchor: typeof anchor) {
		oldAnchor?.classList.remove("mdc-menu-surface--anchor");
		if (!anchor?.classList.contains("mdc-menu-surface--anchor")) {
			anchor.classList.add("mdc-menu-surface--anchor");
		}

		dispatch("change");
	}
</script>

<UseState value={anchor} onUpdate={handleAnchorChange} />
