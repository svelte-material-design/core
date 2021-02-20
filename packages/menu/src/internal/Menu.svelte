<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { MDCMenu } from "@material/menu";
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { MenuSurface } from "../../../menu-surface/src/dom";
	import { UseAnchor } from "../../../menu-surface/src/internal";
	import type { MDCMenuDistance } from "@material/menu-surface";
	import { MenuAnchorCorner, MenuVariant, createMenuContext } from "..";
	import { List } from ".";
	import type { OnMenuSelect } from "./types";
	import type { ListOrientation, ListItemsStyle } from "../../../list";
	import { smuiToMDCCorner } from "../../../menu-surface/functions";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { createComponentsGroupStore } from "../../../common/components-group";
	import type { SelectionType } from "../../../common/hoc";
	import type { ItemContext } from "../item";
	import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { classList } from "@raythurnevoid/strings-filter";
	import {
		Group,
		OnGroupItemsUpdateEvent,
	} from "@raythurnevoid/svelte-group-components/ts";
	import type { OnMenuChildrenChangeEvent } from "../types";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	//#region list
	export let orientation: ListOrientation = "vertical";
	export let itemsStyle: ListItemsStyle = "textual";
	export let itemsRows: number = 1;
	export let dense: boolean = false;
	//#endregion

	//#region menu surface
	export let open: boolean = false;
	export let quickOpen: boolean = false;
	export let anchorFlipRtl: boolean = true;
	export let anchorCorner: MenuAnchorCorner = "bottom-start";
	$: anchorCorner = anchorCorner ? anchorCorner : "bottom-start";
	export let anchorMargin: MDCMenuDistance = undefined;
	export let variant: MenuVariant = undefined;
	export let hoisted: boolean;
	export let anchor: HTMLElement;
	//#endregion

	export let wrapFocus: boolean = false;
	export let disableMDCInstance: boolean = false;
	export let group: SelectionGroupBinding;
	export let selectionType: SelectionType = undefined;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		open: void;
		close: void;
		closing: void;
		select: OnMenuSelect;
		optionsChange: OnMenuChildrenChangeEvent;
	}>();

	let _open: boolean = open;
	let menuGroup: Group;
	let items$ = createComponentsGroupStore<ItemContext>();

	const context$ = createMenuContext({
		open,
		selectionGroup: group,
		selectionType,
		registerItem: (item: ItemContext) => {
			items$.registerItem(item);
		},
		unregisterItem: (item: ItemContext) => {
			items$.unregisterItem(item);
		},
		reinitialize() {
			initialize();
		},
	});
	$: $context$ = {
		...$context$,
		open: _open,
		selectionGroup: group,
		selectionType,
	};

	let menu: MDCMenu;

	//#region keep MDCMenu synchronized
	$: if (menu) {
		if (variant === "fixed") {
			menu.setFixedPosition(true);
		} else {
			menu.setFixedPosition(false);
		}
	}

	$: if (menu && anchorMargin) {
		menu.setAnchorMargin(anchorMargin);
	}

	$: if (menu) {
		menu.setIsHoisted(!!hoisted);
	}

	$: if (menu) {
		if (menu.wrapFocus !== wrapFocus) {
			menu.wrapFocus = wrapFocus;
		}

		if (menu.quickOpen !== quickOpen) {
			menu.quickOpen = quickOpen;
		}
	}

	$: if (menu && anchorCorner) {
		const corner = smuiToMDCCorner(anchorCorner, anchorFlipRtl);
		menu.setAnchorCorner(corner);
	}
	//#endregion

	onMount(async () => {
		$context$ = { ...$context$, group: menuGroup.getBindings() };
		initialize();
	});

	onDestroy(() => {
		menu?.destroy();
	});

	function initialize() {
		if (!disableMDCInstance) {
			menu?.destroy();
			menu = new MDCMenu(dom);
			menu.listen("MDCMenu:selected", handleSelected);
			menu.listen("MDCMenuSurface:opened", handleOpen);
			menu.listen("MDCMenuSurface:closed", handleClose);
			menu.listen("MDCMenuSurface:closing", handleClosing);
		}
	}

	function handleAnchorChange() {
		if (!disableMDCInstance) {
			menu.setAnchorElement(anchor);
		}
	}

	async function handleOpen() {
		_open = open = true;
		await tick();
		dispatch("open");
	}

	async function handleClose() {
		_open = open = false;
		await tick();
		dispatch("close");
	}

	async function handleClosing() {
		dispatch("closing");
	}

	function handleOpenValueUpdate() {
		if (menu) {
			if (open) {
				menu.open = true;
			} else {
				menu.open = false;
			}
		}
	}

	async function handleSelected(
		event: CustomEvent<{ item: HTMLLIElement; index: number }>
	) {
		dispatch("select", {
			targetIndex: event.detail.index,
			target: event.detail.item,
		});
	}

	function handleOptionsChange(event: OnGroupItemsUpdateEvent) {
		dispatch("optionsChange", {
			items: event.items.map((i) => i.dom as HTMLLIElement),
		});
	}

	export function getItems() {
		return menuGroup.getItems();
	}
	//#endregion
</script>

<UseAnchor {anchor} on:change={() => handleAnchorChange()} />
<UseState value={open} onUpdate={handleOpenValueUpdate} />

<Group
	bind:this={menuGroup}
	on:optionsChange={(e) => handleOptionsChange(e.detail)}
>
	<MenuSurface
		bind:dom
		{id}
		class={classList([className, "mdc-menu"])}
		{style}
		open={_open}
		{variant}
		{...$$restProps}
	>
		<List
			{orientation}
			{itemsStyle}
			{itemsRows}
			{dense}
			{group}
			aria-hidden={!open}
			on:click
			on:mousedown
			on:mouseup
			on:keydown
			on:keyup
			on:focus
			on:blur
			on:focusin
			on:focusout
		>
			<slot />
		</List>
	</MenuSurface>
</Group>
