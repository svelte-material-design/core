<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { Ripple } from "../../../../ripple";
	import { classList } from "@raythurnevoid/strings-filter";
	import { ItemContent } from ".";
	import { Li } from "../../../../common/dom";
	import type { ListItemComponent, ListItemElement } from "./types";
	import type { ItemLines } from "../../item/types";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: ListItemElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let activated: boolean = false;
	export let disabled: boolean = false;
	export let lines: ItemLines = 1;

	export let component: ListItemComponent = Li;
	//#endregion

	//#region implementation
	//#endregion
</script>

<Ripple let:rippleClasses target={ripple ? dom : undefined}>
	<svelte:component
		this={component}
		bind:dom
		{id}
		class={classList([
			className,
			"mdc-list-item",
			[lines === 1, "mdc-list-item--with-one-line"],
			[lines === 2, "mdc-list-item--with-two-lines"],
			[lines === 3, "mdc-list-item--with-three-lines"],
			[disabled, "mdc-list-item--disabled"],
			[selected, "mdc-list-item--selected"],
			[activated, "mdc-list-item--activated"],
			rippleClasses,
		])}
		{style}
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
		<ItemContent let:leadingClassName let:trailingClassName>
			<slot {activated} {selected} {leadingClassName} {trailingClassName} />
		</ItemContent>
	</svelte:component>
</Ripple>
