<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { classList } from "@raythurnevoid/strings-filter";
	import { Button } from "../../button/src/internal";
	import type { ButtonVariant, ButtonColor, ButtonDOM } from "../../button";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: ButtonDOM = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let color: ButtonColor = "primary";
	export let variant: ButtonVariant = "text";
	export let disabled: boolean = false;
	export let accessibleTouch: boolean = false;

	export let action: string = "close";
	let defaultAction: boolean = false;
	export { defaultAction as default };
	//#endregion

	//#region implementation
	//#endregion
</script>

<Button
	bind:dom
	{id}
	class={classList([className, "mdc-dialog__button"])}
	{style}
	{ripple}
	{color}
	{variant}
	{disabled}
	{accessibleTouch}
	data-mdc-dialog-button-default={defaultAction && ""}
	data-mdc-dialog-action={action}
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
</Button>
