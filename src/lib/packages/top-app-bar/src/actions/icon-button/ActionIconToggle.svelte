<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { IconButtonToggle } from "../../../../icon-button-toggle/src/internal";
	import { classList } from "@raythurnevoid/strings-filter";
	import type { IconButtonColor } from "../..";
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
	export let active: boolean = false;
	export let disabled: boolean = false;
	export let color: IconButtonColor = undefined;
	export let ariaLabelOn: string = undefined;
	export let ariaLabelOff: string = undefined;
	//#endregion

	//#region implementation
	//#endregion
</script>

<IconButtonToggle
	bind:dom
	{id}
	class={classList([className, "mdc-card__action-icons"])}
	{style}
	bind:active
	{disabled}
	{color}
	{ripple}
	{ariaLabelOn}
	{ariaLabelOff}
	{...$$restProps}
	on:change
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur
>
	<slot />
</IconButtonToggle>
