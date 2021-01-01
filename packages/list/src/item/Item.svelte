<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/Item:${count++}`;

	import { ItemRole } from "../types";
	export let dom: HTMLLIElement = undefined;

	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Item
	//#region import
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { getListContext } from "../";
	import { ItemContext, OnItemSelectedEvent } from ".";
	import { Selectable } from "@raythurnevoid/svelte-group-components/esm/selectable";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { Item } from "../internal";

	//#endregion

	//#region exports
	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let disabled: boolean = false;
	export let tabindex: number = -1;
	export let value: any = undefined;
	export let ariaLabel: string = undefined;
	export let title: string = undefined;

	export let role: ItemRole = undefined;
	//#endregion

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

	const context = ({
		tabindex,
		disabled,
		selected,
		value,
		role: _role,
		setTabIndex(newValue: number) {
			tabindex = newValue;
		},
	} as any) as ItemContext;

	$: Object.assign(context, {
		disabled,
		selected,
		tabindex,
		dom,
		value,
		role: _role,
	});

	$: listRole =
		$listContext$.dom === dom?.parentElement ? $listContext$.role : undefined;

	onMount(async () => {
		await tick();

		if ($listContext$.dom === dom.parentElement) {
			$listContext$.registerItem(context);
		}
	});

	onDestroy(() => {
		if (dom && $listContext$.dom === dom.parentElement) {
			$listContext$.unregisterItem(context);
		}
	});

	function handleChange() {
		dispatch("change", { dom, selected });
	}
</script>

<svelte:options immutable={true} />

<UseState value={ripple} onUpdate={() => $listContext$.reinitialize()} />

<Selectable
	bind:this={selectable}
	bind:selected
	group={$listContext$.group}
	{dom}
	{value}
	on:change={handleChange}>
	<Item
		bind:dom
		{props}
		{id}
		class={className}
		{style}
		{title}
		{tabindex}
		{selected}
		{value}
		role={_role}
		{ariaLabel}
		{ripple}
		{listRole}>
		<slot name="leading" slot="leading" />
		{#if role === 'option' && listRole === 'listbox' && $listContext$.selectionType === 'multi'}
			<input style="display: none;" type="checkbox" checked={selected} />
		{/if}
		<slot {selected} />
		<slot name="trailing" slot="trailing" />
	</Item>
</Selectable>
