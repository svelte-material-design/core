<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { IconButtonToggle } from "./internal";
	import type { IconButtonColor } from ".";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/icon-button-toggle/IconButtonToggle:${count++}`;
	export let dom: HTMLButtonElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let active: boolean = false;
	export let disabled: boolean = false;
	export let color: IconButtonColor = undefined;
	export let ariaLabelOn: string = undefined;
	export let ariaLabelOff: string = undefined;
	//#endregion
</script>

<svelte:options immutable={true} />

<IconButtonToggle
	bind:dom
	{id}
	class={className}
	{style}
	bind:active
	{disabled}
	{ripple}
	{color}
	{ariaLabelOn}
	{ariaLabelOff}
	{...$$restProps}
	on:change
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur>
	<slot />
</IconButtonToggle>
