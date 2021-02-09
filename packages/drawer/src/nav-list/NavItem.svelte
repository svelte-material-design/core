<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/Item:${count++}`;

	export let dom: HTMLAnchorElement = undefined;

	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// NavItem
	import { Item } from "../../../list";
	import { getDrawerContext } from "../DrawerContext";

	//#region exports
	export let ripple: boolean = true;
	export let activated: boolean = false;
	export let disabled: boolean = false;
	export let href: string = undefined;
	export let ariaLabel: string = undefined;
	export let title: string = undefined;
	//#endregion

	const drawerContext$ = getDrawerContext();
</script>

<!-- <UseState value={ripple} onUpdate={() => $drawerContext$.reinitialize()} /> -->
<!-- TODO: for drawer -->

<Item
	bind:dom
	{props}
	{id}
	class={className}
	{style}
	{ripple}
	{href}
	{title}
	{disabled}
	{activated}
	{ariaLabel}
>
	<slot />
</Item>
