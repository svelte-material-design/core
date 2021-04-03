<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { List } from "../../../list/src/internal";
	import type { ListOrientation, ListItemsStyle } from "../../../list";
	import { getDrawerContext } from "../DrawerContext";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/drawer/nav-list/NavList:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let orientation: ListOrientation = "vertical";
	export let itemsStyle: ListItemsStyle = "textual";
	export let dense: boolean = false;
	export let itemsRows: number = 1;
	//#endregion

	//#region implementation
	const drawerContext$ = getDrawerContext();
	//#endregion
</script>

<nav bind:this={dom}>
	<List
		{id}
		class={className}
		{style}
		{orientation}
		{itemsStyle}
		{dense}
		{itemsRows}
		disableMDCInstance={$drawerContext$.variant === "dismissible" ||
			$drawerContext$.variant === "modal"}
		{...$$restProps}
		on:click
		on:mousedown
		on:mouseup
		on:keydown
		on:keyup
		on:focusin
		on:focusout
	>
		<slot />
	</List>
</nav>
