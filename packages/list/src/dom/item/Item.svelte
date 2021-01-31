<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { Ripple } from "../../../../ripple";
	import type { ItemRole } from "../../internal";
	import { classList } from "@raythurnevoid/strings-filter";
	import { ItemContent } from ".";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLLIElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let disabled: boolean = false;
	export let value: any = undefined;

	export let role: ItemRole = undefined;
	//#endregion

	//#region implementation
	//#endregion
</script>

<Ripple let:rippleClasses target={ripple ? dom : undefined}>
	<li
		bind:this={dom}
		{id}
		class={classList([
			className,
			"mdc-list-item",
			[disabled, "mdc-list-item--disabled"],
			[
				(role === "option" || role === "menuitem") && selected,
				"mdc-list-item--selected",
			],
			[role === "menuitem" && selected, "mdc-menu-item--selected"],
			rippleClasses,
		])}
		{style}
		data-value={value}
		{role}
		{...$$restProps}
	>
		<slot name="inputHidden" />
		<ItemContent {selected} let:leadingClassName let:trailingClassName>
			<slot {selected} {leadingClassName} {trailingClassName} />
		</ItemContent>
	</li>
</Ripple>
