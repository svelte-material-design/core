<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { MDCList } from "@material/list";
	import type { MDCListActionEvent } from "@material/list";
	import { onDestroy, createEventDispatcher, onMount, tick } from "svelte";
	import type {
		SelectionGroupBinding,
		SelectionType,
	} from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type { ListOrientation, ListType } from "..";
	import { createListContext } from "..";
	import { List } from "../dom";
	import { Group } from "@raythurnevoid/svelte-group-components";
	import type { ItemContext } from "../item";
	import type { OnListActionEvent, ListImplRole } from "./types";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement | HTMLUListElement = undefined;
	//#endregion

	export let role: ListImplRole = "list";
	export let orientation: ListOrientation = "vertical";
	export let type: ListType = "textual";
	export let itemsRows: number = 1;
	export let dense: boolean = false;
	export let wrapFocus: boolean = false;

	export let group: SelectionGroupBinding;
	// export let group: GroupBindings;
	export let selectionType: SelectionType = undefined;

	export let disableMDCInstance: boolean = false;
	//#endregion

	//#region implementation
	let list: MDCList;
	let listGroup: Group;

	const context$ = createListContext({
		listSelectionGroup: group,
		role,
		selectionType,
		reinitialize() {
			initialize();
		},
	});
	$: $context$ = {
		...$context$,
		dom,
		role,
		list,
		selectionType,
	};

	const dispatch = createEventDispatcher<{
		action: OnListActionEvent;
	}>();

	onMount(async () => {
		$context$ = { ...$context$, listGroup: listGroup.getBindings() };

		await tick();

		initialize();
	});

	onDestroy(() => {
		list && list.destroy();
	});

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

	function getItems(): ItemContext[] {
		return listGroup?.getItems().map((item) => item.externalContext);
	}

	function fixInitialTabIndex() {
		const items = getItems();
		if (items.length) {
			if (!items.some((item) => item?.dom.getAttribute("tabindex") === "0")) {
				const firstEnabledItem = items.find((item) => !item?.disabled);
				firstEnabledItem?.dom.setAttribute("tabindex", "0");
			}
		}
	}

	async function handleAction(event: MDCListActionEvent) {
		const listSelectedIndex = list.selectedIndex;
		dispatch("action", {
			targetIndex: event.detail.index,
			listSelectedIndex,
		});
	}
	//#endregion
</script>

<Group bind:this={listGroup} on:optionsChange={fixInitialTabIndex}>
	<List
		bind:dom
		{id}
		class={className}
		{style}
		{role}
		{orientation}
		{type}
		{itemsRows}
		{dense}
		aria-orientation={orientation}
	>
		<slot />
	</List>
</Group>
