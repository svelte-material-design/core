<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { MDCTab } from "@material/tab";
	import { onMount, onDestroy } from "svelte";
	import { Tab } from "./internal";
	import type { TabElement } from "./types";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/tab/Tab:${count++}`;
	export let dom: TabElement = undefined;
	//#endregion

	export let value: string = undefined;
	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let stacked: boolean = false;
	export let useMinWidth: boolean = false;
	export let href: string = undefined;
	export let focusOnActivate: boolean = true;
	//#endregion

	//#region implementation
	let tab: MDCTab;

	onMount(async () => {
		initialize();
	});

	$: if (tab) {
		if (tab.focusOnActivate !== focusOnActivate) {
			tab.focusOnActivate = focusOnActivate;
		}
	}

	onDestroy(() => {
		tab?.destroy();
	});

	function initialize() {
		tab?.destroy();
		tab = new MDCTab(dom);
		tab.listen("MDCTab:interacted", interactedHandler);

		if (selected) {
			tab.activate();
		} else {
			tab.deactivate();
		}
	}

	function interactedHandler() {
		selected = tab.active;
	}

	function onActiveChange() {
		if (tab && tab.active !== selected) {
			if (selected) {
				tab.activate();
			} else {
				tab.deactivate();
			}
		}
	}

	export function activate() {
		selected = true;
	}

	export function deactivate() {
		selected = false;
	}

	export function focus() {
		return tab.focus();
	}

	export function computeIndicatorClientRect() {
		return tab.computeIndicatorClientRect();
	}

	export function computeDimensions() {
		return tab.computeDimensions();
	}
	//#endregion
</script>

<UseState value={selected} onUpdate={onActiveChange} />

<Tab
	bind:dom
	{id}
	class={className}
	{style}
	{selected}
	{value}
	{focusOnActivate}
	{useMinWidth}
	{ripple}
	{stacked}
	{href}
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
	<slot />
</Tab>
