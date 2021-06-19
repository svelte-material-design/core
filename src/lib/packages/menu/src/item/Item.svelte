<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region import
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { Item } from "../internal";
	import { getMenuContext } from "..";
	import { Selectable } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type { OnSelectableChangeEvent } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { createEventDispatcher, tick } from "svelte";
	import type { OnItemChangeEvent } from "./types";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/Item:${count++}`;
	export let dom: HTMLLIElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let disabled: boolean = false;
	export let value: any = undefined;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		change: OnItemChangeEvent;
	}>();

	const menuContext$ = getMenuContext();

	$: if ($menuContext$.selectionType && selected == null) {
		selected = false;
	}

	async function handleChange(event: CustomEvent<OnSelectableChangeEvent>) {
		if (selected !== event.detail.selected) {
			selected = event.detail.selected;
			await tick();
		}
		dispatch("change", { dom, selected });
	}
	//#endregion
</script>

<UseState value={ripple} onUpdate={() => $menuContext$.reinitialize()} />

<Selectable
	bind:selected
	group={$menuContext$.selectionGroup}
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
		{value}
		{disabled}
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
		<slot {selected} {leadingClassName} {trailingClassName} />
	</Item>
</Selectable>
