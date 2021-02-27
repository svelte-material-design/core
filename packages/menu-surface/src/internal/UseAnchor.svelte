<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { UseState } from "@raythurnevoid/svelte-hooks/ts";
	import type { MenuSurfaceAnchor } from "../types";
	import { isAnchorElement } from "../functions";

	export let dom: HTMLElement;
	export let anchor: MenuSurfaceAnchor;

	const dispatch = createEventDispatcher<{
		update: {
			anchorElement?: HTMLElement;
		};
	}>();

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

		let newAnchorElement: HTMLElement;

		if (anchor) {
			if (isAnchorElement(anchor)) {
				newAnchorElement = anchor;
			} else {
				dispatch("update", {});
			}
		} else {
			newAnchorElement = dom.parentElement;
		}

		if (newAnchorElement) {
			if (!newAnchorElement.classList.contains("mdc-menu-surface--anchor")) {
				newAnchorElement.classList.add("mdc-menu-surface--anchor");
			}

			dispatch("update", {
				anchorElement: newAnchorElement,
			});
		}
	}
</script>

<UseState value={[dom, anchor]} onUpdate={handleAnchorChange} />
