<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "../../../packages/common/events";
	const forwardDOMEvents = DOMEventsForwarder();
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
	import { onDestroy, createEventDispatcher } from "svelte";
	import { Nav, Ul } from "../../../packages/common/dom";
	import {
		createListContext,
		getCreateMDCListInstance,
		ListRole,
	} from "./ListContext";
	import { ItemContext } from "./item";
	import { getMenuSurfaceContext } from "../../../packages/menu-surface";
	import { getDrawerContext, DrawerVariant } from "../../../packages/drawer";
	import {
		SelectableGroup,
		SelectionType,
		OnSelectableGroupChange,
	} from "../../../packages/common/hoc";
	import { getDialogContext } from "../../../packages/dialog"; // TODO: fix circular dep
	import { setDisableCheckboxMDCIstance } from "../../../packages/checkbox";
	import { Use } from "../../../packages/common/hooks";
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
	export let value: any = undefined;
	export let indexHasValues: boolean = undefined;
	//#endregion

	const dispatch = createEventDispatcher<{
		change: {
			value: typeof value;
			dom: typeof dom;
		};
	}>();

	//#region local variables
	const items = new Set<ItemContext>();
	let selectableGroup: SelectableGroup;

	let selectionType: SelectionType = null;

	$: if (menuSurfaceContext$) {
		role = "menu";
	}

	$: if (
		(!nonInteractive && role === "listbox") ||
		role === "radiogroup" ||
		role === "menu"
	) {
		selectionType = "single";
	} else if (!nonInteractive && role === "group") {
		selectionType = "multi";
	} else {
		selectionType = null;
	}
	//#endregion

	//#region init contexts
	const menuSurfaceContext$ = getMenuSurfaceContext();
	const drawerContext$ = getDrawerContext();
	const dialogContext$ = getDialogContext();

	const shouldCreateMDCListInstance = getCreateMDCListInstance();
	setDisableCheckboxMDCIstance(true);

	const context$ = createListContext({
		registerItem(item: ItemContext) {
			items.add(item);
		},
		unregisterItem(item: ItemContext) {
			items.delete(item);
		},
	});

	let component: typeof Nav | typeof Ul;
	$: component = drawerContext$ ? Nav : Ul;

	$: if (drawerContext$) {
		wrapFocus = true;
	}

	// Try to use index as values if no items has value or indexHasValues is true
	$: if (list && value == null) {
		if (selectionType === "single") {
			list.selectedIndex = -1;
		} else if (selectionType === "multi") {
			list.selectedIndex = [];
		}
	}

	//#endregion

	let list: MDCList;

	$: if (list && $dialogContext$?.isOpen) list.layout();

	// Keep context updated
	$: $context$ = { ...$context$, role, isNav: !!drawerContext$, list };

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

		if (role === "list") {
			selectableGroup.setValue(null);
		}
	}

	onDestroy(() => {
		list && list.destroy();
	});

	function init(domValue: typeof dom, drawerVariant: DrawerVariant) {
		list?.destroy();

		if (
			shouldCreateMDCListInstance !== false &&
			$drawerContext$?.variant !== "dismissible" &&
			$drawerContext$?.variant !== "modal"
		) {
			list = new MDCList(dom);
			list.listen("MDCList:action", handleAction);
		}
	}

	function handleAction(event: MDCListActionEvent) {
		const item = Array.from(items)[event.detail.index];

		if (!list || !item || item.disabled) return;

		if (selectionType) {
			if (
				(selectionType === "single" &&
					list.selectedIndex === event.detail.index) ||
				(selectionType === "multi" &&
					(list.selectedIndex as number[]).includes(event.detail.index))
			) {
				selectableGroup.setItemSelected(event.detail.index, true);
			} else {
				selectableGroup.setItemSelected(event.detail.index, false);
			}
		} else {
			item.sendOnSelected();
		}
	}

	function handleChange(event: CustomEvent<OnSelectableGroupChange>) {
		if (list) {
			if (selectionType === "single") {
				list.selectedIndex = event.detail.selectedItemsIndex[0] ?? -1;
			} else if (selectionType === "multi") {
				list.selectedIndex = event.detail.selectedItemsIndex;
			}
		}

		dispatch("change", {
			value,
			dom: dom,
		});
	}

	$: props = {
		...props,
		role,
		"aria-orientation": orientation,
		"aria-hidden": menuSurfaceContext$ ? !$menuSurfaceContext$.open : null,
		tabindex: role === "menu" ? "-1" : null,
	};
</script>

<Use
	effect
	hook={() => init(dom, $drawerContext$ ? $drawerContext$.variant : undefined)} />

<SelectableGroup
	bind:this={selectableGroup}
	bind:value
	{selectionType}
	{indexHasValues}
	on:change={handleChange}>
	<svelte:component
		this={component}
		bind:dom
		{props}
		{id}
		class="mdc-list {className}
      {nonInteractive ? 'mdc-list--non-interactive' : ''}
      {dense ? 'mdc-list--dense' : ''}
      {avatarList ? 'mdc-list--avatar-list' : ''}
      {twoLine ? 'mdc-list--two-line' : ''}
      {threeLine && !twoLine ? 'smui-list--three-line' : ''}
      {orientation === 'horizontal' ? 'smui-list--horizontal' : ''}"
		{style}
		on:domEvent={forwardDOMEvents}>
		<slot />
	</svelte:component>
</SelectableGroup>
