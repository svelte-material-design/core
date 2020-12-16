<script context="module" lang="ts">
	let count = 0;

	export interface OnListActionEvent {
		targetIndex: number;
		listSelectedIndex: number | number[];
	}
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/List:${count++}`;

	export let dom: HTMLDivElement | HTMLUListElement = undefined;
	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// List
	//#region imports
	import { MDCList, MDCListActionEvent } from "@material/list";
	import { onDestroy, createEventDispatcher, onMount, tick } from "svelte";
	import { Nav, Ul } from "../../../common/dom";
	import { SelectionType } from "../../../common/hoc";
	import { SelectionGroupBinding } from "../../../common/selectable";
	import {
		ListRole,
		ListOrientation,
		ItemContext,
		ListType,
		createListContext,
	} from "..";
	import { getMenuSurfaceContext } from "../../../menu-surface";
	//#endregion

	//#region exports
	export let role: ListRole | "listbox" | "menu" = "list";
	export let orientation: ListOrientation = "vertical";
	export let ariaMultiselectable: boolean = undefined;
	export let type: ListType = "textual";
	export let itemsRows: number = 1;
	$: if (itemsRows > 3) {
		itemsRows = 3;
	} else if (itemsRows < 1) {
		itemsRows = 1;
	}

	export let dense: boolean = false;
	export let density: number = 0;
	$: if (itemsRows === 1) {
		if (density > 0) density = 0;
		else if (density < -4) density = -4;
	} else {
		density = 0;
	}

	export let wrapFocus: boolean = false;
	export let isNav: boolean = false;

	export let group: SelectionGroupBinding;
	export let selectionType: SelectionType = undefined;

	export let disableMDCInstance: boolean = false;
	//#endregion

	const dispatch = createEventDispatcher<{
		action: OnListActionEvent;
	}>();

	//#region local variables
	let list: MDCList;

	const menuSurfaceContext$ = getMenuSurfaceContext();

	let items = new Set<ItemContext>();

	const context$ = createListContext({
		group,
		role,
		isNav,
		selectionType,
		registerItem(item: ItemContext) {
			items.add(item);
			items = new Set(items);

			fixInitialTabIndex();
		},
		unregisterItem(item: ItemContext) {
			items.delete(item);
			items = new Set(items);
		},
		reinitialize() {
			initialize();
		},
	});
	$: $context$ = {
		...$context$,
		dom,
		role,
		isNav,
		list,
		selectionType,
	};
	//#endregion

	onMount(async () => {
		await tick();
		initialize();
	});

	onDestroy(() => {
		list && list.destroy();
	});

	// Keep MDCList properties updated
	$: if (list) {
		if (list.singleSelection !== (selectionType === "single")) {
			list.singleSelection = selectionType === "single";
		}

		if (
			orientation === "vertical" &&
			(!list.vertical == null || list.vertical === false)
		) {
			list.vertical = true;
		} else if (
			orientation === "horizontal" &&
			(list.vertical == null || list.vertical === true)
		) {
			list.vertical = false;
		}

		if (list.wrapFocus !== wrapFocus) {
			list.wrapFocus = wrapFocus;
		}
	}

	async function initialize() {
		if (!disableMDCInstance) {
			list?.destroy();

			list = new MDCList(dom);
			list.listen("MDCList:action", handleAction);
		}

		fixInitialTabIndex();
	}

	function fixInitialTabIndex() {
		if (items.size) {
			const itemsArray = Array.from(items);
			if (!itemsArray.some((item) => item.tabindex === 0)) {
				const firstEnabledItem = itemsArray.find((item) => !item.disabled);
				firstEnabledItem?.setTabIndex(0);
			}
		}
	}

	async function handleAction(event: MDCListActionEvent) {
		dispatch("action", {
			targetIndex: event.detail.index,
			listSelectedIndex: list.selectedIndex,
		});
	}

	$: component = isNav ? Nav : Ul;

	$: props = {
		...props,
		role,
		"aria-orientation": orientation,
		"aria-hidden": menuSurfaceContext$ ? !$menuSurfaceContext$.open : null,
		"aria-multiselectable": ariaMultiselectable,
		tabindex: role === "menu" ? "-1" : null,
	};
</script>

<svelte:options immutable={true} />

<svelte:component
	this={component}
	bind:dom
	{props}
	{id}
	class={parseClassList([
		className,
		'mdc-list',
		[dense, 'mdc-list--dense'],
		[density, `smui-list--density--${Math.abs(density)}`],
		[itemsRows === 2, 'mdc-list--two-line'],
		[itemsRows === 3, 'smui-list--three-line'],
		[orientation === 'horizontal', 'smui-list--horizontal'],
		[type === 'textual', 'mdc-list--textual-list'],
		[type === 'avatar', 'mdc-list--avatar-list'],
		[type === 'icon', 'mdc-list--icon-list'],
		[type === 'image', 'mdc-list--image-list'],
		[type === 'thumbnail', 'mdc-list--thumbnail-list'],
		[type === 'video', 'mdc-list--video-list'],
	])}
	{style}>
	<slot />
</svelte:component>
