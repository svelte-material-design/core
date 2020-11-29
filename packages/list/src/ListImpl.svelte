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
	import { ItemContext } from "./item";
	import { getMenuSurfaceContext } from "../../../packages/menu-surface";
	import { getDrawerContext } from "../../../packages/drawer";
	import { SelectionType } from "../../../packages/common/hoc";
	import { setDisableCheckboxMDCIstance } from "../../../packages/checkbox";
	import { GroupBinding } from "../../common/selectable";
	import { roleToSelectionType } from "./toleToSelectionType";
	import { ListRole } from ".";
	//#endregion

	//#region exports
	export let role: ListRole = "list";
	export let nonInteractive: boolean = false;
	export let orientation: "vertical" | "horizontal" = "vertical";

	export let dense: boolean = false;
	export let avatarList: boolean = false;
	export let twoLine: boolean = false;
	export let threeLine: boolean = false;
	export let wrapFocus: boolean = false;

	export let group: GroupBinding;
	//#endregion

	const dispatch = createEventDispatcher<{
		action: OnListActionEvent;
	}>();

	//#region local variables
	let list: MDCList;

	const menuSurfaceContext$ = getMenuSurfaceContext();

	const drawerContext$ = getDrawerContext();
	$: if (drawerContext$) {
		wrapFocus = true;
	}

	let items = new Set<ItemContext>();
	let selectionType: SelectionType;
	const shouldCreateMDCListInstance = getCreateMDCListInstance();

	$: if (menuSurfaceContext$) {
		role = "menu";
	}

	$: selectionType = !nonInteractive ? roleToSelectionType(role) : null;

	const context$ = createListContext({
		group,
		registerItem(item: ItemContext) {
			items.add(item);
			items = new Set(items);
		},
		unregisterItem(item: ItemContext) {
			items.delete(item);
			items = new Set(items);
		},
		reinitialize() {
			initialize();
		},
	});
	$: $context$ = { ...$context$, role, isNav: !!drawerContext$, list };
	//#endregion

	setDisableCheckboxMDCIstance(true);

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

	function initialize() {
		list?.destroy();

		if (
			shouldCreateMDCListInstance !== false &&
			$drawerContext$?.variant !== "dismissible" &&
			$drawerContext$?.variant !== "modal"
		) {
			list = new MDCList(dom);
			list.listen("MDCList:action", handleAction);
		}

		const itemsArray = Array.from(items);
		if (!itemsArray.some((item) => item.tabindex === 0)) {
			itemsArray[0].setTabIndex(0);
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

	$: component = drawerContext$ ? Nav : Ul;

	$: props = {
		...props,
		role,
		"aria-orientation": orientation,
		"aria-hidden": menuSurfaceContext$ ? !$menuSurfaceContext$.open : null,
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
		[nonInteractive, 'mdc-list--non-interactive'],
		[dense, 'mdc-list--dense'],
		[avatarList, 'mdc-list--avatar-list'],
		[twoLine, 'mdc-list--two-line'],
		[threeLine && !twoLine, 'smui-list--three-line'],
		[orientation === 'horizontal', 'smui-list--horizontal'],
	])}
	{style}>
	<slot />
</svelte:component>
