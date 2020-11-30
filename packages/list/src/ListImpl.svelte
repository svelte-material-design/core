<script context="module" lang="ts">
	let count = 0;

	export interface OnListActionEvent {
		targetIndex: number;
		listSelectedIndex: number | number[];
	}
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/List:${count++}`;

	export let dom: HTMLDivElement | HTMLUListElement = undefined;
	import { BaseProps } from "../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// List
	//#region imports
	import { MDCList, MDCListActionEvent } from "@material/list";
	import { onDestroy, createEventDispatcher, onMount, tick } from "svelte";
	import { Nav, Ul } from "../../../packages/common/dom";
	import { createListContext, getCreateMDCListInstance } from "./ListContext";
	import { getMenuSurfaceContext } from "../../../packages/menu-surface";
	import { SelectionType } from "../../../packages/common/hoc";
	import { GroupBinding } from "../../common/selectable";
	import { ListRole, ListOrientation, ItemContext } from ".";
	//#endregion

	//#region exports
	export let role: ListRole | "listbox" = "list";
	export let orientation: ListOrientation = "vertical";
	export let ariaMultiselectable: boolean = undefined;

	export let dense: boolean = false;
	export let avatarList: boolean = false;
	export let twoLine: boolean = false;
	export let threeLine: boolean = false;

	export let wrapFocus: boolean = false;
	export let isNav: boolean = false;

	export let group: GroupBinding;
	export let selectionType: SelectionType = undefined;
	//#endregion

	const dispatch = createEventDispatcher<{
		action: OnListActionEvent;
	}>();

	//#region local variables
	let list: MDCList;

	const menuSurfaceContext$ = getMenuSurfaceContext();

	let items = new Set<ItemContext>();
	const shouldCreateMDCListInstance = getCreateMDCListInstance();

	$: if (menuSurfaceContext$) {
		role = "menu";
	}

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
		role,
		isNav,
		list,
		selectionType,
	};
	//#endregion

	onMount(async () => {
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
		if (shouldCreateMDCListInstance !== false) {
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

		if (selectionType) {
			const itemElement = list.listElements[event.detail.index];
			const item = Array.from(items).find((item) => item.dom === itemElement);

			if (!list || !item || item.disabled) return;

			await tick();

			item.notifySelected(item.selected);
		}
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
		[avatarList, 'mdc-list--avatar-list'],
		[twoLine, 'mdc-list--two-line'],
		[threeLine && !twoLine, 'smui-list--three-line'],
		[orientation === 'horizontal', 'smui-list--horizontal'],
	])}
	{style}>
	<slot />
</svelte:component>
