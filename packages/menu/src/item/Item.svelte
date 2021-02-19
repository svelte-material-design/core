<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region import
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { Item } from "../../../list/src/dom";
	import { getMenuContext } from "..";
	import { Selectable } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type { ItemContext } from ".";
	import { createEventDispatcher, onDestroy, onMount, tick } from "svelte";
	import type { OnItemSelectedEvent, OnItemChangeEvent } from ".";
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
	export let tabindex: number = -1;
	export let value: any = undefined;
	export let ariaLabel: string = undefined;
	export let title: string = undefined;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		select: OnItemSelectedEvent;
		change: OnItemChangeEvent;
	}>();

	const menuContext$ = getMenuContext();

	const context = {
		value,
		selected,
		dom,
	} as ItemContext;

	$: Object.assign(context, {
		value,
		selected,
		dom,
	});

	onMount(() => {
		context.dom = dom;
		$menuContext$.registerItem(context);
	});

	onDestroy(() => {
		$menuContext$.unregisterItem(context);
	});
	//#endregion
</script>

<UseState value={ripple} onUpdate={() => $menuContext$.reinitialize()} />

<Selectable
	bind:selected
	group={$menuContext$.selectionGroup}
	{dom}
	{value}
	{context}
>
	<Item
		bind:dom
		{id}
		class={className}
		{style}
		{title}
		{tabindex}
		{selected}
		{value}
		{ariaLabel}
		{disabled}
		{ripple}
		{...$$restProps}
		let:leadingClassName
		let:trailingClassName
	>
		<slot {selected} {leadingClassName} {trailingClassName} />
	</Item>
</Selectable>
