<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { createEventDispatcher, onDestroy, onMount } from "svelte";
	import { MDCTabBar } from "@material/tab-bar";
	import type { MDCTabBarActivatedEvent } from "@material/tab-bar";
	import { UseState } from "@raythurnevoid/svelte-hooks/ts";
	import { TabScroller } from ".";
	import type {
		TabIndicatorTransition,
		OnTabBarChildrenChange,
		OnTabBarChange,
		TabContext,
	} from ".";
	import { classList } from "@raythurnevoid/strings-filter";
	import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/selectable";
	import { SelectionGroup } from "@raythurnevoid/svelte-group-components/selectable";
	import { setTabBarContext } from "./TabBarContext";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/snackbar/Snackbar:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let focusOnActivate: boolean = true;
	export let activateOnKeyboardNavigation: boolean = true;
	export let value: string = undefined;
	export let transition: TabIndicatorTransition = "slide";
	export let nullable: boolean = false;
	export let group: SelectionGroupBinding = undefined;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		change: OnTabBarChange;
		optionsChange: OnTabBarChildrenChange;
	}>();

	let tabBar: MDCTabBar;
	let selectionGroup: SelectionGroup;
	let valueState: UseState;

	const context$ = setTabBarContext({
		transition,
		setActive(tab: TabContext) {
			value = tab.value;
		},
		reinitialize() {
			if (tabBar) {
				initialize();
			}
		},
	});
	$: $context$ = { ...$context$, transition };

	onMount(() => {
		$context$ = { ...$context$, group: selectionGroup.getBindings() };

		initialize();
	});

	$: if (tabBar) {
		if (tabBar.focusOnActivate !== focusOnActivate) {
			tabBar.focusOnActivate = focusOnActivate;
		}

		if (tabBar.useAutomaticActivation !== activateOnKeyboardNavigation) {
			tabBar.useAutomaticActivation = activateOnKeyboardNavigation;
		}
	}

	onDestroy(() => {
		tabBar?.destroy();
	});

	function initialize() {
		tabBar?.destroy();
		tabBar = new MDCTabBar(dom);
		tabBar.listen("MDCTabBar:activated", handleActivated);
		if (value) {
			const activeTabIndex = getSelectedTabIndex();
			tabBar.activateTab(activeTabIndex);
		}
	}

	function handleOptionsChange() {
		initialize();
		dispatch("optionsChange", {
			dom,
			items: selectionGroup
				.getItems()
				.map((item) => item.dom as HTMLButtonElement),
		});
	}

	async function handleActivated(event: MDCTabBarActivatedEvent) {
		const index = event.detail.index;
		const selectedItem = selectionGroup.getItems()[index];
		selectionGroup.setSelected(selectedItem, true);
	}

	async function handleTabSelection() {
		const selectedTabIndex = getSelectedTabIndex();
		tabBar.activateTab(selectedTabIndex);
		dispatch("change", {
			dom,
			value,
		});
	}

	async function handleActiveValueChange() {
		if (tabBar && value) {
			const activeIndex = getSelectedTabIndex();
			tabBar.activateTab(activeIndex);
		}
	}

	function getSelectedTabIndex() {
		const items = selectionGroup.getItems();
		return items.findIndex((tab) => tab.value === value);
	}

	export function scrollIntoView(index: number) {
		return tabBar.scrollIntoView(index);
	}
	//#endregion
</script>

<UseState bind:this={valueState} {value} onUpdate={handleActiveValueChange} />

<SelectionGroup
	bind:this={selectionGroup}
	bind:value
	{nullable}
	{group}
	selectionType="single"
	on:change={handleTabSelection}
	on:optionsChange={handleOptionsChange}
>
	<div
		bind:this={dom}
		{id}
		class={classList([className, "mdc-tab-bar"])}
		{style}
		role="tablist"
		{...$$restProps}
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
		<TabScroller>
			<slot />
		</TabScroller>
	</div>
</SelectionGroup>
