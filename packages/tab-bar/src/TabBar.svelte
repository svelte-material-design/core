<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { onDestroy, onMount } from "svelte";
	import { MDCTabBar, MDCTabBarActivatedEvent } from "@material/tab-bar";
	import { UseState } from "../../../packages/common/hooks";
	import { TabScroller, TabIndicatorTransition } from ".";
	import { parseClassList } from "../../../packages/common/functions";
	import { SingleSelectionGroup } from "../../common/selectable";
	import { setTabBarContext } from "./TabBarContext";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
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

	let tabBar: MDCTabBar;
	let selectionGroup: SingleSelectionGroup;

	const context$ = setTabBarContext({
		transition,
	});
	$: $context$ = { ...$context$, transition };

	onMount(() => {
		$context$ = { ...$context$, group: selectionGroup.getBindings() };

		initialize();
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

	function handleActivated(event: MDCTabBarActivatedEvent) {
		const index = event.detail.index;
		active = getTabs()[index];
	}

	function handleActiveValueChange() {
		if (tabBar) {
			const activeIndex = getTabs().indexOf(active);
			tabBar.activateTab(activeIndex);
		}
	}

	function getActiveTab() {
		return getTabs().find((tab) => tab === active);
	}

	function getTabs(): string[] {
		const tabs = selectionGroup.getItems();
		return tabs ? Array.from(tabs).map((item) => item.value) : [];
	}

	export function scrollIntoView(index: number) {
		return tabBar.scrollIntoView(index);
	}
</script>

<svelte:options immutable={true} />

<UseState value={active} onUpdate={handleActiveValueChange} />

<SingleSelectionGroup bind:this={selectionGroup} bind:value={active}>
	<div
		bind:this={dom}
		{...$$restProps}
		{id}
		class={parseClassList([className, 'mdc-tab-bar'])}
		{style}
		role="tablist">
		<TabScroller>
			<slot />
		</TabScroller>
	</div>
</SingleSelectionGroup>
