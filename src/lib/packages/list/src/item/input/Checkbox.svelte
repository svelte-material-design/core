<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { CheckboxStyles } from "../../../../checkbox/src/index.js";
	import { Checkbox } from "../../../../checkbox/src/dom/index.js";
	import { getItemContext } from "../ItemContext.js";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

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

<Checkbox
	bind:dom
	class={className}
	{style}
	{id}
	accessibleTouch={false}
	ripple={false}
	{readonly}
	checked={$itemContext$.selected}
	value={$itemContext$.value}
	disabled={$itemContext$.disabled || disabled}
	{...$$restProps}
/>

<CheckboxStyles />
