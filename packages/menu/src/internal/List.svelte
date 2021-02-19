<svelte:options immutable={true} />

<script lang="ts">
	// List
	//#region imports
	import { List } from "../../../list/src/dom";
	import type { ListOrientation, ListItemsStyle } from "../../../list";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLUListElement = undefined;
	//#endregion

	export let orientation: ListOrientation = "vertical";
	export let itemsStyle: ListItemsStyle = "textual";
	export let itemsRows: number = 1;
	export let dense: boolean = false;
	export let wrapFocus: boolean = true;
	//#endregion

	//#region implementation
	//#endregion
</script>

<List
	bind:dom
	{id}
	class={className}
	{style}
	{orientation}
	{itemsRows}
	{itemsStyle}
	{dense}
	{wrapFocus}
	role="menu"
	tabindex="-1"
	{...$$restProps}
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur
	on:focusin
	on:focusout
>
	<slot />
</List>
