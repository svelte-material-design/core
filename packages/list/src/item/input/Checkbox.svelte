<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import "../../../../checkbox/src/index.scss";
	import { Checkbox } from "../../../../checkbox/src/dom";
	import { getItemContext } from "../ItemContext";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLInputElement = undefined;
	//#endregion

	export let value: string = undefined;
	export let expandedTouchTarget: boolean = true;
	export let density: number = undefined;

	export let name: string = undefined;
	export let disabled: boolean = false;
	export let required: boolean = false;
	export let readonly: boolean = undefined;
	//#endregion

	//#region implementation
	const itemContext$ = getItemContext();
	//#endregion
</script>

<Checkbox
	bind:dom
	class={className}
	{style}
	{id}
	checked={$itemContext$.selected}
	{value}
	{expandedTouchTarget}
	{density}
	{name}
	{disabled}
	{required}
	{readonly}
	{...$$restProps}
/>
