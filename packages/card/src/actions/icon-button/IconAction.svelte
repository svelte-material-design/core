<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { IconButton } from "../../../../icon-button/src/internal";
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
	export let color: IconButtonColor = undefined;
	export let href: string = undefined;
	export let disabled: boolean = false;
	// export let variant: TODO: allow support of variants, using Button underneath
	//#endregion
</script>

<svelte:options immutable={true} />

<IconButton
	bind:dom
	{...$$restProps}
	{id}
	class={parseClassList([
		className,
		'mdc-card__action',
		'mdc-card__action--icon',
	])}
	{style}
	{disabled}
	{href}
	{color}
	{ripple}
	on:click>
	<slot />
</IconButton>
