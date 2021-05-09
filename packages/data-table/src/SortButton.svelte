<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { Icon, IconButton } from "../../icon-button";
	import { onDestroy } from "svelte";
	import { SortDirection, getHeadCellContext } from "./";
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLButtonElement = undefined;
	//#endregion

	export let direction: SortDirection = undefined;
	export let ariaLabel: string = undefined;
	//#endregion

	//#region implementation
	const headCellContext$ = getHeadCellContext();

	$headCellContext$.setSort(true);

	$: $headCellContext$?.setSortDirection(direction);

	onDestroy(() => {
		$headCellContext$.setSort(false);
	});
	//#endregion
</script>

<IconButton
	bind:dom
	{id}
	class={classList([className, "mdc-data-table__sort-icon-button"])}
	{style}
	{ariaLabel}
	aria-describedby="{id}__status"
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
	<slot>
		<Icon>arrow_upward</Icon>
	</slot>
</IconButton>
<div
	class="mdc-data-table__sort-status-label"
	aria-hidden="true"
	id="{id}__status"
/>
