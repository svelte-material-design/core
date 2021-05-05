<svelte:options immutable={true} />

<script lang="ts">
	import { classList } from "@raythurnevoid/strings-filter";

	//#region  imports
	import { Checkbox } from "../../checkbox/src/dom";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let checked: boolean = false;
	export let value: string = undefined;
	//export let allowIndeterminated: boolean = false;
	export let ripple: boolean = true;
	export let accessibleTouch: boolean = true;
	export let density: number = undefined;

	export let disabled: boolean = false;
	export let readonly: boolean = undefined;
	//#endregion

	//#region implementation
	//#endregion
</script>

<Checkbox
	bind:dom
	bind:checked
	class={classList([className, "mdc-data-table__row-checkbox"])}
	{style}
	{id}
	{value}
	{ripple}
	{accessibleTouch}
	{density}
	{disabled}
	{readonly}
	{...$$restProps}
	on:change
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur
/>
