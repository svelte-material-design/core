<script lang="ts">
	import { onDestroy, onMount, tick } from "svelte";
	import {
		createSlotClassListHandler,
		SlotClassListHandler,
	} from "../../../../common/functions";

	export let selected: boolean = undefined;
	export let itemDom: HTMLElement;

	let leadingSlotClassHandler: SlotClassListHandler;
	let trailingSlotClassHandler: SlotClassListHandler;

	onMount(async () => {
		await tick();

		if ($$slots.leading) {
			const slotElement = itemDom.querySelector(
				"[slot=leading]"
			) as HTMLElement;
			leadingSlotClassHandler = createSlotClassListHandler(slotElement, [
				"mdc-list-item__graphic",
			]);
		}

		if ($$slots.trailing) {
			const slotElement = itemDom.querySelector(
				"[slot=trailing]"
			) as HTMLElement;
			trailingSlotClassHandler = createSlotClassListHandler(slotElement, [
				"mdc-list-item__meta",
			]);
		}
	});

	onDestroy(() => {
		leadingSlotClassHandler?.destroy();
		trailingSlotClassHandler?.destroy();
	});
</script>

<svelte:options immutable={true} />

<span class="mdc-list-item__ripple" />
<slot name="leading" />
<slot {selected} />
<slot name="trailing" />
