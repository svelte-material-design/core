<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { ItemImpl } from ".";
	import type { ItemLines } from "../../item/types";
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
	export let activated: boolean = false;
	export let disabled: boolean = false;
	export let value: string = undefined;
	export let href: string = undefined;
	export let lines: ItemLines = undefined;
	//#endregion

	//#region implementation
	//#endregion
</script>

<li bind:this={dom} {id}>
	<ItemImpl
		class={className}
		{style}
		{selected}
		{activated}
		{ripple}
		{disabled}
		{value}
		{href}
		{lines}
		{...$$restProps}
		let:leadingClassName
		let:trailingClassName
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
		<slot {activated} {selected} {leadingClassName} {trailingClassName} />
	</ItemImpl>
</li>
