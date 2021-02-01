<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/drawer/nav-list/NavList:${count++}`;

	export let dom: HTMLDivElement = undefined;
	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// NavList
	import { List } from "../../../list/src/internal";
	import type { ListOrientation, ListType } from "../../../list";
	import { getDrawerContext } from "../DrawerContext";

	//#region exports
	export let orientation: ListOrientation = "vertical";
	export let type: ListType = "textual";

	export let dense: boolean = false;
	export let itemsRows: number = 1;
	//#endregion

	const drawerContext$ = getDrawerContext();
</script>

<List
	bind:dom
	{props}
	{id}
	class={className}
	{style}
	{orientation}
	{type}
	{dense}
	{itemsRows}
	disableMDCInstance={$drawerContext$.variant === "dismissible" ||
		$drawerContext$.variant === "modal"}
>
	<slot />
</List>
