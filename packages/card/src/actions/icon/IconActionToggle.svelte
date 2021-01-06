<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import type { SwitchableString } from "../../../../icon-button-toggle/src";
	import { IconButtonToggle } from "../../../../icon-button-toggle/src/internal";
	import { parseClassList } from "../../../../common/functions";
	import type { IconButtonDOM, IconButtonColor } from "../..";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/card/iconAction:${count++}`;
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
	class={parseClassList([
		className,
		'mdc-card__action',
		'mdc-card__action--icon',
	])}
	{style}
	bind:active
	{title}
	{ariaLabel}
	{disabled}
	{color}
	{ripple}
	on:click>
	<slot />
</IconButtonToggle>
