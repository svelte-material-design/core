<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import type { ButtonColor, ButtonDOM, ButtonVariant } from "../types";
	import { setButtonContext } from "../ButtonContext";
	import { Button } from "../dom";
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
	export let href: string = undefined;
	export let accessibleTouch: boolean = false;
	//#endregion

	//#region implementation
	let hasLeadingIcon: boolean = false;
	let hasTrailingIcon: boolean = false;

	setButtonContext({
		setHasLeadingIcon(value) {
			hasLeadingIcon = value;
		},
		setHasTrailingIcon(value) {
			hasTrailingIcon = value;
		},
	});
	//#endregion
</script>

<Button
	bind:dom
	{id}
	class={className}
	{variant}
	{ripple}
	{color}
	{style}
	{disabled}
	{href}
	{accessibleTouch}
	{hasLeadingIcon}
	{hasTrailingIcon}
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
	<slot name="leading" slot="leading" />
	<slot />
	<slot name="trailing" slot="trailing" />
</Button>
