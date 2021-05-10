<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { classList } from "@raythurnevoid/strings-filter";
	import { onDestroy, onMount, tick } from "svelte";
	import { Checkbox } from "../../checkbox/src/dom";
	import {
		getDataTableContext,
		getRowBehaviour,
		getRowContext,
	} from "./DataTableContext";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let value: string = undefined;
	export let ripple: boolean = true;
	export let accessibleTouch: boolean = true;
	export let density: number = undefined;

	export let disabled: boolean = false;
	export let readonly: boolean = undefined;
	//#endregion

	//#region implementation
	const rowContext$ = getRowContext();
	const rowBehaviour = getRowBehaviour();
	const dataTableContext$ = getDataTableContext();

	onMount(() => {
		$dataTableContext$.layout();
	});

	onDestroy(async () => {
		await tick();
		$dataTableContext$.layout();
	});
	//#endregion
</script>

<Checkbox
	bind:dom
	class={classList([
		className,
		[rowBehaviour === "header", "mdc-data-table__header-row-checkbox"],
		[rowBehaviour === "body", "mdc-data-table__row-checkbox"],
	])}
	{style}
	{id}
	checked={$rowContext$?.selected}
	{value}
	{ripple}
	{accessibleTouch}
	{density}
	{disabled}
	{readonly}
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
/>
