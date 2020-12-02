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

	export let dense: boolean = false;
	export let twoLine: boolean = false;
	export let threeLine: boolean = false;
	//#endregion
</script>

<ListImpl
	bind:dom
	{props}
	{id}
	class={className}
	{style}
	role="list"
	{orientation}
	{type}
	{dense}
	{twoLine}
	{threeLine}
	wrapFocus
	isNav>
	<slot />
</ListImpl>
