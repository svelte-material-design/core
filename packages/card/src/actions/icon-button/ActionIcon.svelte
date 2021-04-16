<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { IconButton } from "../../../../icon-button/src/internal";
	import { classList } from "@raythurnevoid/strings-filter";
	import type { IconButtonDOM, IconButtonColor } from ".";
	import { setActionType } from "../ActionsContext";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: IconButtonDOM = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let color: IconButtonColor = undefined;
	export let disabled: boolean = false;
	//#endregion

	//#region implementation
	setActionType("icon");
	//#endregion
</script>

<IconButton
	bind:dom
	{id}
	class={classList([className, "mdc-card__action", "mdc-card__action--icon"])}
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
