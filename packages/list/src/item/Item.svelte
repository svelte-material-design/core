<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import {
		createSlotClassListHandler,
		parseClassList,
		SlotClassListHandler,
	} from "../../../common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/Item:${count++}`;

	import { ItemRole } from "../types";
	export let dom: HTMLLIElement = undefined;

	import { BaseProps } from "../../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Item
	//#region import
	import { onMount, onDestroy, createEventDispatcher } from "svelte";
	import { getListContext } from "../";
	import { createItemContext, ItemContext, OnItemSelectedEvent } from ".";
	import { getMenuSurfaceContext } from "../../../../packages/menu-surface";
	import { Selectable } from "../../../../packages/common/selectable";
	import { Ripple3 } from "../../../../packages/ripple";
	import { UseState } from "../../../../packages/common/hooks";

	//#endregion

	//#region exports
	export let ripple: boolean = true;
	export let activated: boolean = false;
	export let selected: boolean = false;
	export let disabled: boolean = false;
	export let tabindex: number = -1;
	export let href: string = undefined;
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
	let rippleClasses: string;
	const listContext$ = getListContext();
	const menuSurfaceContext$ = getMenuSurfaceContext();

	let _role = role;
	$: _role = role;
	$: if (!role && $listContext$.role === "radiogroup") {
		_role = "radio";
	} else if ($listContext$.role === "menu" || menuSurfaceContext$) {
		_role = "menuitem";
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
		notifySelected() {
			dispatch("change", { dom, selected });
		},
		setTabIndex(newValue: number) {
			tabindex = newValue;
		},
	} as any) as ItemContext;
	const context$ = createItemContext({ ...context });

	$: $context$ = {
		...Object.assign(context, {
			...$context$,
			disabled,
			selected,
			tabindex,
			dom,
			value,
			role: _role,
		}),
	};

	let leadingSlotClassHandler: SlotClassListHandler;
	let trailingSlotClassHandler: SlotClassListHandler;

	onMount(() => {
		$listContext$.registerItem(context);

		if ($$slots.leading) {
			const slotElement = dom.querySelector("[slot=leading]") as HTMLElement;
			leadingSlotClassHandler = createSlotClassListHandler(slotElement, [
				"mdc-list-item__graphic",
			]);
		}

		if ($$slots.trailing) {
			const slotElement = dom.querySelector("[slot=trailing]") as HTMLElement;
			trailingSlotClassHandler = createSlotClassListHandler(slotElement, [
				"mdc-list-item__meta",
			]);
		}
	});

	onDestroy(() => {
		$listContext$.unregisterItem(context);

		leadingSlotClassHandler?.destroy();
		trailingSlotClassHandler?.destroy();
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
		role: _role,
		"aria-label": ariaLabel,
		title: title,
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
	<li
		bind:this={dom}
		{...props}
		{id}
		class={parseClassList([
			className,
			'mdc-list-item',
			[disabled, 'mdc-list-item--disabled'],
			[
				(_role === 'option' || _role === 'menuitem') && selected,
				'mdc-list-item--selected',
			],
			[_role === 'menuitem' && selected, 'mdc-menu-item--selected'],
			rippleClasses,
		])}
		{style}>
		{#if _role === 'option' && $listContext$.role === 'listbox' && $listContext$.selectionType === 'multi'}
			<input style="display: none;" type="checkbox" checked={selected} />
		{/if}
		{#if ripple}
			<Ripple3
				bind:rippleClasses
				rippleElement={'mdc-list-item__ripple'}
				target={dom} />
		{:else}<span class="mdc-list-item__ripple" />{/if}
		<slot name="leading" />
		<slot {selected} />
		<slot name="trailing" />
	</li>
</Selectable>
