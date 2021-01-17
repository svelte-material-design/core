<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/Item:${count++}`;

	export let dom: HTMLLIElement = undefined;

	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Item
	//#region import
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { Item } from "../../../list/src/internal";
	import { getMenuContext } from "..";
	import { Selectable } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { ItemContext } from ".";
	import { createEventDispatcher, onDestroy, onMount, tick } from "svelte";
	import { OnItemSelectedEvent, OnItemChangeEvent } from ".";

	//#endregion

	//#region exports
	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let disabled: boolean = false;
	export let tabindex: number = -1;
	export let value: any = undefined;
	export let ariaLabel: string = undefined;
	export let title: string = undefined;
	//#endregion

	const dispatch = createEventDispatcher<{
		select: OnItemSelectedEvent;
		change: OnItemChangeEvent;
	}>();

	const menuContext$ = getMenuContext();

	const context = {
		async setSelected(newValue: boolean) {
			selected = newValue;

			await tick();

			if ($menuContext$.group) {
				dispatch("change", {
					dom,
					selected,
				});
			}
		},
		notifySelection() {
			dispatch("select", {
				dom,
			});
		},
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
</script>

<UseState value={ripple} onUpdate={() => $menuContext$.reinitialize()} />

{#if $menuContext$.selectionType}
	<Selectable bind:selected group={$menuContext$.group} {dom} {value} {context}>
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
			role="menuitem"
			{ariaLabel}
			{disabled}
			{ripple}
		>
			<slot name="leading" slot="leading" />
			<slot />
			<slot name="trailing" slot="trailing" />
		</Item>
	</Selectable>
{:else}
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
		role="menuitem"
		{ariaLabel}
		{disabled}
		{ripple}
	>
		<slot name="leading" slot="leading" />
		<slot />
		<slot name="trailing" slot="trailing" />
	</Item>
{/if}
