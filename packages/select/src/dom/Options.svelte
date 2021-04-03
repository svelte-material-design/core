<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { Menu, List } from "../../../menu/src/dom";
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let itemsRows: number = 1;
	$: if (itemsRows > 2) itemsRows = 2;
	export let dense: boolean = false;
	//#endregion

	//#region implementation
	//#endregion
</script>

<Menu
	bind:dom
	{id}
	class={classList([className, "mdc-select__menu"])}
	{style}
	{...$$restProps}
	variant="fullwidth"
>
	<List {itemsRows} {dense}>
		<slot />
	</List>
</Menu>
