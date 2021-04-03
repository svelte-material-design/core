<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { createEventDispatcher } from "svelte";
	import { getListContext } from "../";
	import type { OnItemChangeEvent } from ".";
	import { Selectable } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { Item } from "../internal";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/list/Item:${count++}`;
	export let dom: HTMLLIElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let activated: boolean = false;
	export let disabled: boolean = false;
	export let value: string = undefined;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		change: OnItemChangeEvent;
	}>();

	const listContext$ = getListContext();

	$: if ($listContext$.selectionType && selected == null) {
		selected = false;
	}

	async function handleChange() {
		dispatch("change", { dom, selected });
	}
	//#endregion
</script>

<UseState value={ripple} onUpdate={() => $listContext$.reinitialize()} />

<Selectable
	bind:selected
	group={$listContext$.listSelectionGroup}
	{dom}
	{value}
	on:change={handleChange}
>
	<Item
		bind:dom
		{id}
		class={className}
		{style}
		{selected}
		{activated}
		{disabled}
		{value}
		{ripple}
		{...$$restProps}
		let:leadingClassName
		let:trailingClassName
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
		<slot {activated} {selected} {leadingClassName} {trailingClassName} />
	</Item>
</Selectable>
