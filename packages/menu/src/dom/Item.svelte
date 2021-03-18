<svelte:options immutable={true} />

<script lang="ts">
	//#region import
	import { Item } from "../../../list/src/dom";
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLLIElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let disabled: boolean = false;
	export let tabindex: number = -1;
	export let value: any = undefined;
	export let ariaLabel: string = undefined;
	export let title: string = undefined;
	//#endregion

	//#region implementation
	//#endregion
</script>

<Item
	bind:dom
	{id}
	class={classList([
		className,
		"mdc-menu-item",
		[selected, "mdc-menu-item--selected"],
	])}
	{style}
	{title}
	{tabindex}
	{value}
	{ariaLabel}
	{disabled}
	{ripple}
	role="menuitem"
	data-value={value}
	aria-selected={selected}
	aria-disabled={disabled}
	{...$$restProps}
	let:leadingClassName
	let:trailingClassName
>
	<slot {selected} {leadingClassName} {trailingClassName} />
</Item>
