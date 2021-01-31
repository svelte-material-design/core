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
	import { setItemContext } from "./ItemContext";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/list/Item:${count++}`;
	export let dom: HTMLLIElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let selected: boolean = false;
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
		selected = undefined;
	}
	//#endregion

	const context$ = setItemContext({
		disabled,
		selected,
	});
	const context = $context$;
	$: $context$ = {
		...Object.assign(context, {
			...$context$,
			disabled,
			selected,
			dom,
		}),
	};

	$: listRole =
		$listContext$.dom === dom?.parentElement ? $listContext$.role : undefined;

	function handleChange() {
		dispatch("change", { dom, selected });
	}
	//#endregion
</script>

<UseState value={ripple} onUpdate={() => $listContext$.reinitialize()} />

<Selectable
	bind:this={selectable}
	bind:selected
	group={$listContext$.group}
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
		{disabled}
		{value}
		role={_role}
		{ripple}
		{listRole}
		{context}
		{...$$restProps}
		let:leadingClassName
		let:trailingClassName
	>
		<slot {selected} {leadingClassName} {trailingClassName} />
	</Item>
</Selectable>
