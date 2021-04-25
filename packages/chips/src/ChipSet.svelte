<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region imports
	import { createEventDispatcher } from "svelte";
	import { SelectionGroup } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type { SelectionType } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type {
		ChipSetValue,
		ChipSetVariant,
		OnChipSetChange,
		OnChipSetChildrenChange,
	} from "./types";
	import { ChipSet } from "./internal";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/chips/ChipSet:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let value: ChipSetValue = undefined;
	export let variant: ChipSetVariant = undefined;
	export let entryAnimation: boolean = true;
	export let nullable: boolean = false;
	export let group: SelectionGroupBinding = undefined;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		optionsChange: OnChipSetChildrenChange;
		change: OnChipSetChange;
	}>();

	let selectionType: SelectionType;
	$: selectionType =
		variant === "choice"
			? "single"
			: variant === "filter" || variant === "input"
			? "multi"
			: null;

	function handleChange() {
		dispatch("change", {
			dom,
			value,
		});
	}
	//#endregion
</script>

<SelectionGroup
	bind:value
	{nullable}
	{selectionType}
	{group}
	let:group
	on:change={handleChange}
>
	<ChipSet
		bind:dom
		{id}
		class={className}
		{style}
		{variant}
		{entryAnimation}
		{nullable}
		{group}
		{...$$restProps}
		on:interaction
		on:trailingIconInteraction
		on:navigation
		on:selection
		on:removal
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
	</ChipSet>
</SelectionGroup>
