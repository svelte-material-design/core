<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { Button } from "../../../../button/src/internal";
	import { classList } from "@raythurnevoid/strings-filter";
	import type { ButtonColor, ButtonVariant } from ".";
	import { setActionType } from "../ActionsContext";
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
	export let color: ButtonColor = "primary";
	export let variant: ButtonVariant = "text";
	export let disabled: boolean = false;
	export let accessibleTouch: boolean = false;
	//#endregion

	//#region implementation
	setActionType("button");
	//#endregion
</script>

<Button
	bind:dom
	{id}
	class={classList([className, "mdc-card__action", "mdc-card__action--button"])}
	{style}
	{ripple}
	{color}
	{variant}
	{disabled}
	{accessibleTouch}
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
</Button>
