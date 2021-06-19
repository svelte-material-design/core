<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import "../../../../icon-button";
	import { IconButton } from "../../../../icon-button/src/internal";
	import { classList } from "@raythurnevoid/strings-filter";
	import type { IconButtonColor } from ".";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLButtonElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let color: IconButtonColor = undefined;
	export let disabled: boolean = false;
	//#endregion

	//#region implementation
	//#endregion
</script>

<IconButton
	bind:dom
	{id}
	class={classList([className, "mdc-top-app-bar__navigation-icon"])}
	{style}
	{disabled}
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
>
	<slot />
</IconButton>
