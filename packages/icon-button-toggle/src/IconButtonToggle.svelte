<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { IconButtonToggle } from "./internal";
	import type { IconButtonDOM, SwitchableString, IconButtonColor } from ".";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/icon-button-toggle/IconButtonToggle:${count++}`;
	export let dom: IconButtonDOM = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let active: boolean = false;
	export let disabled: boolean = false;
	export let title: SwitchableString = undefined;
	export let ariaLabel: SwitchableString = undefined;
	export let color: IconButtonColor = undefined;
	//#endregion
</script>

<svelte:options immutable={true} />

<IconButtonToggle
	bind:dom
	{...$$restProps}
	{id}
	class={className}
	{style}
	bind:active
	{disabled}
	{ripple}
	{title}
	{ariaLabel}
	{color}>
	<slot />
</IconButtonToggle>
