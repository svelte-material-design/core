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
	import { setLabelBehaviour } from "../../common/dom/LabelContext";
	import { setIconBehaviour } from "../../common/dom";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/tab/Tab:${count++}`;
	export let dom: HTMLButtonElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let key: any = undefined;
	export let active: boolean = false;
	export let stacked: boolean = false;
	export let useMinWidth: boolean = false;
	export let focusOnActivate: boolean = true;
	//#endregion

	let tab: MDCTab;

	setIconBehaviour("tab");
	setLabelBehaviour("tab");

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

		if (active) {
			tab.activate();
		} else {
			tab.deactivate();
		}
	}

	function interactedHandler() {
		active = tab.active;
	}

	function onActiveChange() {
		if (tab && tab.active !== active) {
			if (active) {
				tab.activate();
			} else {
				tab.deactivate();
			}
		}
	}

	export function activate() {
		active = true;
	}

	export function deactivate() {
		active = false;
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
</script>

<UseState value={active} onUpdate={onActiveChange} />

<Tab
	{...$$restProps}
	bind:dom
	{id}
	class={className}
	{style}
	{active}
	{key}
	{focusOnActivate}
	{useMinWidth}
	{ripple}
	{stacked}
>
	<slot />
</Tab>
