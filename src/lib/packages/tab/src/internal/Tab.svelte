<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { classList } from "@raythurnevoid/strings-filter";
	import { A, Button } from "../../../common/dom";
	import type { TabElement } from "../types";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: TabElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let stacked: boolean = false;
	export let useMinWidth: boolean = false;
	export let href: string = undefined;
	//#endregion

	//#region implementation
	let component: typeof Button | typeof A = href ? A : Button;
	//#endregion
</script>

<svelte:component
	this={component}
	bind:dom
	{id}
	class={classList([
		className,
		"mdc-tab",
		[selected, "mdc-tab--active"],
		[stacked, "mdc-tab--stacked"],
		[useMinWidth, "mdc-tab--min-width"],
	])}
	{style}
	role="tab"
	aria-selected={selected}
	tabindex={selected ? 0 : -1}
	{href}
	{...$$restProps}
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur
	on:focusin
	on:focusout
>
	<slot />
	{#if ripple}<span class="mdc-tab__ripple" />{/if}
</svelte:component>
