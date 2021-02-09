<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { onDestroy, onMount } from "svelte";
	import { TabScroller } from "./internal";
	import { MDCTabScroller } from "@material/tab-scroller";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/tab-scroller/TabScroller:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion
	//#endregion

	let tabScroller: MDCTabScroller;

	onMount(async () => {
		initialize();
	});

	onDestroy(() => {
		tabScroller?.destroy();
	});

	function initialize() {
		tabScroller?.destroy();
		tabScroller = new MDCTabScroller(dom);
	}

	export function scrollTo(scrollX: number) {
		return tabScroller.scrollTo(scrollX);
	}

	export function incrementScroll(scrollXIncrement: number) {
		return tabScroller.incrementScroll(scrollXIncrement);
	}

	export function getScrollPosition() {
		return tabScroller.getScrollPosition();
	}

	export function getScrollContentWidth() {
		return tabScroller.getScrollContentWidth();
	}
</script>

<TabScroller {...$$restProps} bind:dom {id} class={className} {style} />
