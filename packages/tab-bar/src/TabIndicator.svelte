<svelte:options immutable={true} />

<script lang="ts">
	import { onMount } from "svelte";

	//#region imports
	import { TabIndicator } from "../../tab-indicator/src/internal";
	import { getTabBarContext, getTabContext } from "./TabBarContext";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLSpanElement = undefined;
	//#endregion
	//#endregion

	let tabBarContext$ = getTabBarContext();
	let tabContext$ = getTabContext();

	onMount(() => {
		$tabBarContext$.reinitialize();
	});
</script>

<TabIndicator
	{...$$restProps}
	bind:dom
	{id}
	class={className}
	{style}
	active={$tabContext$.active}
	transition={$tabBarContext$.transition}
/>
