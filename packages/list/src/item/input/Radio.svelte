<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import "../../../../radio/src/index.scss";
	import { Radio } from "../../../../radio/src/dom";
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

	export let disabled: boolean = false;
	export let readonly: boolean = undefined;
	//#endregion

	//#region implementation
	const itemContext$ = getItemContext();
	//#endregion
</script>

<Radio
	bind:dom
	class={className}
	{style}
	{id}
	checked={$itemContext$.selected}
	value={$itemContext$.value}
	accessibleTouch={false}
	ripple={false}
	disabled={$itemContext$.disabled || disabled}
	{readonly}
	{...$$restProps}
/>
