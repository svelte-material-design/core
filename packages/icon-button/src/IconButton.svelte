<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { IconButton } from "./internal";
	import { parseClassList } from "../../common/functions";
	import type { IconButtonDOM, IconButtonColor } from ".";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/button/IconButton:${count++}`;
	export let dom: IconButtonDOM = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let color: IconButtonColor = undefined;
	export let href: string = undefined;
	export let disabled: boolean = false;
	//#endregion

	//#region implementation
	//#endregion
</script>

<svelte:options immutable={true} />

<IconButton
	bind:dom
	{id}
	class={parseClassList([className])}
	{style}
	{disabled}
	{href}
	{color}
	{ripple}
	{...$$restProps}
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur>
	<slot />
</IconButton>
