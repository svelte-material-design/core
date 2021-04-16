<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region  imports
	import { onMount, onDestroy, createEventDispatcher } from "svelte";
	import { classList } from "@raythurnevoid/strings-filter";
	import type { OnTopAppBarCollapsedChange, TopAppBarColor } from ".";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { TopAppBar } from "./internal";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/top-app-bar/CollapsableTopAppBar:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let color: TopAppBarColor = "primary";
	export let dense: boolean = false;
	export let prominent: boolean = false;
	export let scrollTarget: HTMLElement = undefined;
	export let alwaysCollapsed: boolean = false;

	export let collapsed: boolean = alwaysCollapsed ?? false;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		change: OnTopAppBarCollapsedChange;
	}>();

	let topAppBar: TopAppBar;
	let observer: MutationObserver;

	let innerContentClass: string;
	$: if (!dense && !prominent) {
		innerContentClass = "mdc-top-app-bar--short-fixed-adjust";
	} else {
		innerContentClass = undefined;
	}

	onMount(() => {
		observer = new MutationObserver(() => {
			const newCollapsed = isCollapsed();
			setTimeout(
				() => {
					collapsed = newCollapsed;
					dispatch("change", {
						dom,
						collapsed,
					});
				},
				!newCollapsed ? 100 : 0
			);
		});
	});

	onDestroy(() => {
		observer?.disconnect();
	});

	function beforeInitialization() {
		observer?.disconnect();
	}

	function afterInitialization() {
		observer.observe(dom, {
			attributes: true,
			attributeFilter: ["class"],
		});

		collapsed = isCollapsed();
	}

	function initialize() {
		beforeInitialization();
		topAppBar.initialize();
		afterInitialization();
	}

	function isCollapsed() {
		return dom?.classList.contains("mdc-top-app-bar--short-collapsed") ?? false;
	}
	//#endregion
</script>

<UseState value={alwaysCollapsed} onUpdate={initialize} />

<TopAppBar
	bind:this={topAppBar}
	bind:dom
	{id}
	class={classList([
		className,
		"mdc-top-app-bar--short",
		[alwaysCollapsed, "mdc-top-app-bar--short-collapsed"],
	])}
	{style}
	variant="standard"
	{color}
	{dense}
	{prominent}
	{scrollTarget}
	{...$$restProps}
	on:beforeInitialization={beforeInitialization}
	on:afterInitialization={afterInitialization}
	on:nav
	let:contentClass
>
	<slot />
	<slot
		name="content"
		slot="content"
		class={innerContentClass || contentClass}
	/>
</TopAppBar>
