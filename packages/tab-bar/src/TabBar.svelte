<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { createEventDispatcher, onDestroy, onMount, tick } from "svelte";
	import { MDCTabBar, MDCTabBarActivatedEvent } from "@material/tab-bar";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { TabScroller, TabIndicatorTransition } from ".";
	import type { OnTabBarChange, TabContext } from ".";
	import { parseClassList } from "../../common/functions";
	import { SingleSelectionGroup } from "@raythurnevoid/svelte-group-components/ts/selectable";
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
	export let active: string = undefined;
	export let transition: TabIndicatorTransition;
	//#endregion

	const dispatch = createEventDispatcher<{
		change: OnTabBarChange;
	}>();

	let tabBar: MDCTabBar;
	let selectionGroup: SingleSelectionGroup;
	let initialized: boolean = false;

	const context$ = setTabBarContext({
		transition,
		setActive(tab: TabContext) {
			active = tab.key;
		},
		reinitialize() {
			if (initialized) {
				initialize();
			}
		},
	});
	$: $context$ = { ...$context$, transition };

	onMount(() => {
		$context$ = { ...$context$, group: selectionGroup.getBindings() };

		initialize();
		initialized = true;
	});

	function initialize() {
		tabBar?.destroy();
		tabBar = new MDCTabBar(dom);
		tabBar.listen("MDCTabBar:activated", handleActivated);
		if (active) {
			const activeTabIndex = getTabs().indexOf(getActiveTab());
			tabBar.activateTab(activeTabIndex);
		}
	}

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

	async function handleActivated(event: MDCTabBarActivatedEvent) {
		const index = event.detail.index;
		active = getTabs()[index].key;

		await tick();

		dispatch("change", {
			dom,
			index,
			active,
		});

		const tabContext = selectionGroup
			.getItems()
			[index].getContext() as TabContext;

		tabContext.setActive(true);
	}

	async function handleActiveValueChange(oldValue: string) {
		if (tabBar) {
			if (active) {
				const activeIndex = getTabs().findIndex((tab) => tab.key === active);
				tabBar.activateTab(activeIndex);
			} else {
				const previouslyActiveTab = getTabs().find(
					(tab) => tab.key === oldValue
				);
				previouslyActiveTab.setActive(false);
				await tick();
				initialize();
			}
		}
	}

	function getActiveTab() {
		return getTabs().find((tab) => tab.key === active);
	}

	function getTabs(): TabContext[] {
		const tabs = selectionGroup.getItems();
		return tabs ? tabs.map((item) => item.externalContext) : [];
	}

	export function scrollIntoView(index: number) {
		return tabBar.scrollIntoView(index);
	}
</script>

<UseState value={active} onUpdate={handleActiveValueChange} />

<SingleSelectionGroup
	bind:this={selectionGroup}
	bind:value={active}
	on:optionsChange={initialize}
>
	<div
		bind:this={dom}
		{...$$restProps}
		{id}
		class={parseClassList([className, "mdc-tab-bar"])}
		{style}
		role="tablist"
	>
		<TabScroller>
			<slot />
		</TabScroller>
	</div>
</SingleSelectionGroup>
