<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { createEventDispatcher } from "svelte";
	import { getListContext } from "../";
	import type { OnItemSelectedEvent } from ".";
	import type { ItemRole } from "..";
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
	export let value: any = undefined;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		change: OnItemSelectedEvent;
	}>();

	//#region locals
	let selectable: Selectable;
	const listContext$ = getListContext();
	let role: ItemRole;

	$: if ($listContext$.role === "radiogroup") {
		role = "radio";
	} else if ($listContext$.role === "listbox") {
		role = "option";
	} else if ($listContext$.role === "group") {
		role = "checkbox";
	}

	$: if (!$listContext$.selectionType) {
		selected = null;
	} else if ($listContext$.selectionType && selected == null) {
		selected = false;
	}
	//#endregion

	async function handleChange() {
		dispatch("change", { dom, selected });
	}
	//#endregion
</script>

<UseState value={ripple} onUpdate={() => $listContext$.reinitialize()} />

<Selectable
	bind:this={selectable}
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
		{role}
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
