<script lang="ts">
	import { Ripple3 } from "../../../../../packages/ripple";
	import { ItemRole } from ".";
	import { onDestroy, onMount, tick } from "svelte";
	import {
		createSlotClassListHandler,
		SlotClassListHandler,
	} from "../../../../../packages/common/functions";

	export let selected: boolean = undefined;
	export let ripple: boolean;
	export let itemDom: HTMLElement;
	export let rippleClasses: string;

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

{#if ripple}
	<Ripple3
		bind:rippleClasses
		rippleElement={'mdc-list-item__ripple'}
		target={itemDom} />
{:else}<span class="mdc-list-item__ripple" />{/if}
<slot name="leading" />
<slot {selected} />
<slot name="trailing" />
