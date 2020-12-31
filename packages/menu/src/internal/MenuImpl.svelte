<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../../packages/common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLDivElement = undefined;
	import { BaseProps } from "../../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Menu
	import { MDCMenu } from "@material/menu";
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { MenuSurface } from "../../../../packages/menu-surface/src/internal";
	import { MDCMenuDistance } from "@material/menu-surface";
	import { MenuAnchorCorner, MenuVariant, createMenuContext } from "..";
	import { List, OnMenuImplSelect } from ".";
	import { ListOrientation, ListType } from "../../../../packages/list";
	import { smuiToMDCCorner } from "../../../../packages/menu-surface/functions";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { createComponentsGroupStore } from "../../../../packages/common/components-group";
	import { SelectionType } from "../../../../packages/common/hoc";
	import { ItemContext } from "../item";
	import { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/esm/selectable";

	//#region exports
	//#region list
	export let orientation: ListOrientation = "vertical";
	export let type: ListType = "textual";
	export let itemsRows: number = 1;

	export let dense: boolean = false;
	export let density: number = 0;

	export let value: string = undefined;
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

	//#region common
	export let wrapFocus: boolean = false;
	//#endregion

	export let disableMDCInstance: boolean = false;
	export let group: SelectionGroupBinding;
	export let selectionType: SelectionType = undefined;
	//#endregion

	const dispatch = createEventDispatcher<{
		open: undefined;
		close: undefined;
		select: OnMenuImplSelect;
	}>();

	let _open: boolean = open;

	let items$ = createComponentsGroupStore<ItemContext>();

	const context$ = createMenuContext({
		open,
		group,
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
		group,
		selectionType,
	};

	let menu: MDCMenu;

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

	onMount(async () => {
		await tick();

		initialize();
		if (anchor) {
			handleAnchorChange(null);
		}
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
		}
	}

	function handleAnchorChange(oldValue: HTMLElement) {
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
		const item = $items$.find((item) => item.dom === event.detail.item);
		item.notifySelection();

		dispatch("select", {
			itemDom: event.detail.item,
			itemIndex: event.detail.index,
			itemValue: item.value,
			dom,
			item,
		});
	}

	export function getMDCInstance() {
		return menu;
	}
</script>

<svelte:options immutable={true} />

<UseState value={open} onUpdate={handleOpenValueUpdate} />

<MenuSurface
	bind:dom
	{id}
	props={{ ...props }}
	class={parseClassList([className, 'mdc-menu'])}
	{style}
	{open}
	{quickOpen}
	{anchorCorner}
	{variant}
	disableMDCInstance>
	<List bind:value {orientation} {type} {itemsRows} {dense} {density} {group}>
		<slot />
	</List>
</MenuSurface>
