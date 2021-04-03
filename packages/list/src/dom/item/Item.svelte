<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { Ripple } from "../../../../ripple";
	import { classList } from "@raythurnevoid/strings-filter";
	import { ItemContent } from ".";
	import { A, Li } from "../../../../common/dom";
	import type { ItemElement } from "./types";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: ItemElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let activated: boolean = false;
	export let disabled: boolean = false;
	export let href: string = undefined;
	//#endregion

	//#region implementation
	//#endregion
</script>

<Ripple let:rippleClasses target={ripple ? dom : undefined}>
	<svelte:component
		this={href === undefined ? Li : A}
		bind:dom
		{id}
		class={classList([
			className,
			"mdc-list-item",
			[disabled, "mdc-list-item--disabled"],
			[selected, "mdc-list-item--selected"],
			[activated, "mdc-list-item--activated"],
			rippleClasses,
		])}
		{style}
		{href}
		{...$$restProps}
		on:click
		on:mousedown
		on:mouseup
		on:keydown
		on:keyup
		on:focus
		on:focusin
		on:focusout
		on:blur
	>
		<ItemContent {selected} let:leadingClassName let:trailingClassName>
			<slot {selected} {leadingClassName} {trailingClassName} />
		</ItemContent>
	</svelte:component>
</Ripple>
