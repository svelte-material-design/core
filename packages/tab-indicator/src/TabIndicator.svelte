<script lang="ts">
	//#region imports
	import { TabIndicator } from "./internal";
	import { MDCTabIndicator } from "@material/tab-indicator";
	import { onMount, onDestroy } from "svelte";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import type { TabIndicatorTransition } from ".";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLSpanElement = undefined;
	//#endregion

	export let active: boolean = false;
	export let transition: TabIndicatorTransition = "slide";
	//#endregion

	//#region implementation
	let tabIndicator: MDCTabIndicator;

	onMount(async () => {
		tabIndicator = new MDCTabIndicator(dom);
	});

	onDestroy(() => {
		tabIndicator?.destroy();
	});

	function handleActivateChange(oldValue: boolean) {
		if (!oldValue && active) {
			tabIndicator.activate();
		} else if (oldValue && !active) {
			tabIndicator.deactivate();
		}
	}
	//#endregion
</script>

<UseState value={active} onUpdate={handleActivateChange} />

<TabIndicator
	bind:dom
	{id}
	class={className}
	{style}
	{active}
	{transition}
	{...$$restProps}
/>
