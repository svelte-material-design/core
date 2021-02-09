<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region  imports
	import type { TopAppBarColor, TopAppBarVariant } from ".";
	import { TopAppBar } from "./internal";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/top-app-bar/TopAppBar:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let variant: TopAppBarVariant = "standard";
	export let color: TopAppBarColor = "primary";
	export let dense: boolean = false;
	export let prominent: boolean = false;
	export let scrollTarget: HTMLElement = undefined;
	//#endregion

	//#region implementation
	//#endregion
</script>

<TopAppBar
	bind:dom
	{$$restProps}
	{id}
	class={className}
	{style}
	{variant}
	{color}
	{dense}
	{prominent}
	{scrollTarget}
	{...$$restProps}
	on:nav
	let:contentClass
>
	<slot />
	<slot name="content" slot="content" className={contentClass} />
</TopAppBar>
