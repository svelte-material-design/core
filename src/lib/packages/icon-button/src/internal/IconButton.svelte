<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { Button, A } from "../../../common/dom/index.js";
	import { Ripple } from "../../../ripple/index.js";
	import { classList } from "@raythurnevoid/strings-filter";
	import type { IconButtonDOM, IconButtonColor } from "../index.js";
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
	export let href: string = undefined;
	export let disabled: boolean = false;
	//#endregion

	//#region implementation
	let component: typeof Button | typeof A;
	$: component = href == null || disabled ? Button : A;
	//#endregion
</script>

<Ripple target={ripple ? dom : undefined} unbounded={true} let:rippleClasses>
	<svelte:component
		this={href ? A : Button}
		bind:dom
		{id}
		class={classList([
			className,
			"mdc-icon-button",
			[color, `svmd-icon-button--color--${color}`],
			[ripple, rippleClasses],
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
	>
		<slot />
	</svelte:component>
</Ripple>
