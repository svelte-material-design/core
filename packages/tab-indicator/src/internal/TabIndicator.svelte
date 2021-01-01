<script lang="ts">
	import { onMount } from "svelte";

	//#region imports
	import { parseClassList } from "../../../common/functions";
	import { TabIndicatorTransition } from "..";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLSpanElement = undefined;
	//#endregion

	export let active: boolean = false;
	export let transition: TabIndicatorTransition = "slide";
	//#endregion

	let type: "underline" | "icon" = "underline"; //TODO: icon;
</script>

<svelte:options immutable={true} />

<span
	bind:this={dom}
	{...$$restProps}
	{id}
	class={parseClassList([
		className,
		'mdc-tab-indicator',
		[active, 'mdc-tab-indicator--active'],
		[transition === 'fade', 'mdc-tab-indicator--fade'],
	])}
	{style}>
	<span
		class={parseClassList([
			'mdc-tab-indicator__content',
			[type === 'underline', 'mdc-tab-indicator__content--underline'],
			[type === 'icon', 'mdc-tab-indicator__content--icon'],
		])}
		aria-hidden={type === 'icon' ? 'true' : 'false'}><slot /></span>
</span>
