<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { UseState } from "@raythurnevoid/svelte-hooks/ts";
	import type { MenuSurfaceAnchor } from "../types";
	import { isAnchorElement } from "../functions";

	export let anchor: MenuSurfaceAnchor;

	const dispatch = createEventDispatcher<{ update: void }>();

	onMount(async () => {
		if (anchor) {
			await tick();
			handleAnchorChange(null);
		}
	});

	onDestroy(() => {
		if (isAnchorElement(anchor)) {
			anchor?.classList.remove("mdc-menu-surface--anchor");
		}
	});

	function handleAnchorChange(oldAnchor: typeof anchor) {
		if (isAnchorElement(oldAnchor)) {
			oldAnchor?.classList.remove("mdc-menu-surface--anchor");
		}
		if (isAnchorElement(anchor)) {
			if (!anchor?.classList.contains("mdc-menu-surface--anchor")) {
				anchor.classList.add("mdc-menu-surface--anchor");
			}
		}

		dispatch("update");
	}
</script>

<UseState value={anchor} onUpdate={handleAnchorChange} />
