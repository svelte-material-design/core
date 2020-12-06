<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/nav-list/NavList:${count++}`;

	export let dom: HTMLDivElement = undefined;
	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// List
	//#region imports
	import { ListOrientation, ListType } from "../";
	import ListImpl from "../ListImpl.svelte";
	//#endregion

	//#region exports
	export let orientation: ListOrientation = "vertical";
	export let type: ListType = "textual";
	export let itemsRows: number = 1;

	export let dense: boolean = false;
	export let density: number = 0;

	export let wrapFocus: boolean = true;
	//#endregion
</script>

<svelte:options immutable={true} />

<ListImpl
	bind:dom
	{props}
	{id}
	class={className}
	{style}
	role="list"
	{orientation}
	{itemsRows}
	{type}
	{dense}
	{density}
	{wrapFocus}
	isNav>
	<slot />
</ListImpl>
