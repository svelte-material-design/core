<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { classList } from "@raythurnevoid/strings-filter";
	import type { TabIndicatorTransition } from "..";
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
	let type: "underline" | "icon" = "underline"; //TODO: icon;
	//#endregion
</script>

<span
	bind:this={dom}
	{id}
	class={classList([
		className,
		"mdc-tab-indicator",
		[active, "mdc-tab-indicator--active"],
		[transition === "fade", "mdc-tab-indicator--fade"],
	])}
	{style}
	{...$$restProps}
>
	<span
		class={classList([
			"mdc-tab-indicator__content",
			[type === "underline", "mdc-tab-indicator__content--underline"],
			[type === "icon", "mdc-tab-indicator__content--icon"],
		])}
		aria-hidden={type === "icon" ? "true" : "false"}><slot /></span
	>
</span>
