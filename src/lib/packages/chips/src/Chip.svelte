<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { Selectable } from "@raythurnevoid/svelte-group-components/selectable";
	import type { OnSelectableChangeEvent } from "@raythurnevoid/svelte-group-components/selectable";
	import { createEventDispatcher, tick } from "svelte";
	import { getChipSetContext } from "./ChipSetContext";
	import { Chip } from "./internal";
	import type { OnChipChange } from "./types";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/chip-set/Chip:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let value: string = undefined;
	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let accessibleTouch: boolean = false;
	export let hideLeadingIconOnSelect: boolean = true;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		change: OnChipChange;
	}>();

	let chipSetContext$ = getChipSetContext();

	async function handleChange(event: CustomEvent<OnSelectableChangeEvent>) {
		if (selected !== event.detail.selected) {
			selected = event.detail.selected;
			await tick();
		}
		dispatch("change", { dom, selected, value });
	}
	//#endregion
</script>

<Selectable
	bind:selected
	group={$chipSetContext$?.selectionGroup}
	{dom}
	{value}
	on:change={handleChange}
>
	<Chip
		bind:dom
		{id}
		class={className}
		{style}
		bind:selected
		{value}
		{ripple}
		{accessibleTouch}
		{hideLeadingIconOnSelect}
		{...$$restProps}
		on:click
		on:mousedown
		on:mouseup
		on:keydown
		on:keyup
		on:focus
		on:blur
		on:focusin
		on:focusout
	>
		<slot />
	</Chip>
</Selectable>
