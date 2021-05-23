<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { Ripple } from "../../../ripple";
	import type { ButtonColor, ButtonVariant } from "..";
	import { Button, A } from "../../../common/dom";
	import { classList } from "@raythurnevoid/strings-filter";
	import type { ButtonDOM } from "../types";
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

	export let hasLeadingIcon: boolean = false;
	export let hasTrailingIcon: boolean = false;
	//#endregion

	//#region implementation
	let component: typeof Button | typeof A;
	$: component = href == null || disabled ? Button : A;
	//#endregion
</script>

<Ripple let:rippleClasses target={ripple ? dom : undefined}>
	<svelte:component
		this={component}
		bind:dom
		{id}
		class={classList([
			className,
			"mdc-button",
			[variant, `mdc-button--${variant}`],
			[color === "secondary", "svmd-button--color--secondary"],
			[accessibleTouch, "mdc-button--touch"],
			[ripple, rippleClasses],
			[hasLeadingIcon, "mdc-button--icon-leading"],
			[hasTrailingIcon, "mdc-button--icon-trailing"],
		])}
		{style}
		{disabled}
		{href}
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
		{#if ripple}
			<div class="mdc-button__ripple" />
		{/if}
		{#if accessibleTouch}
			<div class="mdc-button__touch" />
		{/if}
		<slot name="leading" />
		<slot />
		<slot name="trailing" />
	</svelte:component>
</Ripple>
