<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { IconButton } from "./internal/index.js";
	import { classList } from "@raythurnevoid/strings-filter";
	import { IconButtonStyles } from "./index.js";
	import type { IconButtonDOM, IconButtonColor } from "./index.js";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svelte-material-design/button/IconButton:${count++}`;
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

<IconButton
	bind:dom
	{id}
	class={classList([className])}
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
	on:blur
	on:focusin
	on:focusout
>
	<slot />
</IconButton>

<IconButtonStyles />
