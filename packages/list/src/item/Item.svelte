<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/Item:${count++}`;

	import { ItemRole, ListItemDOMElement } from "../types";
	export let dom: ListItemDOMElement = undefined;

	import { BaseProps } from "../../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Item
	//#region import
	import { onMount, onDestroy, createEventDispatcher } from "svelte";
	import { Li, A } from "../../../../packages/common/dom";
	import { getListContext } from "../";
	import { createItemContext, ItemContext, OnItemSelectedEvent } from ".";
	import { getMenuSurfaceContext } from "../../../../packages/menu-surface";
	import { OnSelectableChange } from "../../../../packages/common/hoc";
	import { Selectable } from "../../../../packages/common/selectable";
	import { Ripple3 } from "../../../../packages/ripple";
	import { UseState } from "../../../../packages/common/hooks";
	//#endregion

	export let ripple: boolean = true;
	export let activated: boolean = false;
	export let role: ItemRole = undefined; //TODO: forse si può togliere dagli export
	export let selected: boolean = false;
	export let disabled: boolean = false;
	export let tabindex: number = -1;
	export let href: string = undefined;
	export let value: any = undefined;

	const dispatch = createEventDispatcher<{
		selected: OnItemSelectedEvent;
	}>();

	let selectable: Selectable;
	let rippleClasses: string;

	const listContext$ = getListContext();
	const menuSurfaceContext$ = getMenuSurfaceContext();
	$: if ($listContext$.role === "radiogroup") {
		role = "radio";
	} else if ($listContext$.role === "menu" || menuSurfaceContext$) {
		role = "menuitem";
	} else if ($listContext$.role === "listbox") {
		role = "option";
	} else if ($listContext$.role === "group") {
		role = "checkbox";
	}

	const context = ({
		tabindex,
		disabled,
		selected,
		value,
		notifySelected() {
			dispatch("selected", { dom, selected });
		},
		setTabIndex(newValue: number) {
			tabindex = newValue;
		},
	} as any) as ItemContext;
	const context$ = createItemContext({ ...context });

	$: if (disabled && selected) selected = false;

	$: $context$ = {
		...Object.assign(context, {
			...$context$,
			disabled,
			selected,
			tabindex,
			dom,
			value,
		}),
	};

	onMount(() => {
		$listContext$.registerItem(context);
	});

	onDestroy(() => {
		$listContext$.unregisterItem(context);
	});

	$: props = {
		...props,
		href,
		tabindex,
		"aria-current": activated ? "page" : undefined,
		"data-value": value,
		"aria-selected": $listContext$.role === "listbox" ? selected : undefined,
		"aria-checked":
			$listContext$.role === "group" || $listContext$.role === "radiogroup"
				? `${selected}`
				: undefined,
		role,
	};
</script>

<svelte:options immutable={true} />

<UseState value={ripple} onUpdate={() => $listContext$.reinitialize()} />

<Selectable
	bind:this={selectable}
	bind:selected
	group={$listContext$.group}
	{dom}
	{value}>
	<svelte:component
		this={$listContext$.isNav && href ? A : Li}
		bind:dom
		props={{ ...props }}
		{id}
		class={parseClassList([
			className,
			'mdc-list-item',
			[disabled, 'mdc-list-item--disabled'],
			[
				(role === 'option' || role === 'menuitem' || role === 'checkbox') &&
					selected,
				'mdc-list-item--selected',
			],
			[role === 'menuitem' && selected, 'mdc-menu-item--selected'],
			rippleClasses,
		])}
		{style}>
		{#if role === 'checkbox'}<input type="checkbox" checked={selected} />{/if}
		{#if ripple}
			<Ripple3
				bind:rippleClasses
				rippleElement={'mdc-list-item__ripple'}
				target={dom} />
		{:else}<span class="mdc-list-item__ripple" />{/if}
		<slot />
	</svelte:component>
</Selectable>
