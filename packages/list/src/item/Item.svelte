<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { createEventDispatcher, tick } from "svelte";
	import { getListContext } from "../";
	import type { OnItemSelectedEvent } from ".";
	import type { ItemRole } from "..";
	import { Selectable } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { Item } from "../internal";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/list/Item:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let activated: boolean = false;
	export let disabled: boolean = false;
	export let value: any = undefined;

	export let role: ItemRole = undefined;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		change: OnItemSelectedEvent;
	}>();

	//#region locals
	let selectable: Selectable;
	const listContext$ = getListContext();

	let _role = role;
	$: _role = role;
	$: if (!role && $listContext$.role === "radiogroup") {
		_role = "radio";
	} else if ($listContext$.role === "listbox") {
		_role = "option";
	} else if ($listContext$.role === "group") {
		_role = "checkbox";
	}

	$: if (!$listContext$.selectionType || disabled) {
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
		role={_role}
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
		on:focusin
		on:focusout
		on:blur
	>
		<slot {selected} {leadingClassName} {trailingClassName} />
	</Item>
</Selectable>
