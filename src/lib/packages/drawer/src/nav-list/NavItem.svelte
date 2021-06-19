<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { Item } from "../../../list/src/internal";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/Item:${count++}`;
	export let dom: HTMLLIElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let activated: boolean = false;
	export let disabled: boolean = false;
	export let href: string = undefined;
	//#endregion

	//#region implementation
	//#endregion
</script>

<!-- <UseState value={ripple} onUpdate={() => $drawerContext$.reinitialize()} /> -->
<!-- TODO: for drawer -->

<Item
	bind:dom
	{id}
	class={className}
	{style}
	{ripple}
	{href}
	{disabled}
	{activated}
	{...$$restProps}
	let:leadingClassName
	let:trailingClassName
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:focusin
	on:focusout
	on:blur
>
	<slot {activated} {leadingClassName} {trailingClassName} />
</Item>
