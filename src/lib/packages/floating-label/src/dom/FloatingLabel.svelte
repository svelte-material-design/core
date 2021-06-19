<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { Span, Label } from "../../../common/dom";
	//#endregion

	//#region exports
	//#region base
	let className = "";
	export { className as class };
	export let style: string = undefined;
	export let id: string = `smui-FloatingLabel-${count++}`;
	export let dom: HTMLLabelElement | HTMLSpanElement = undefined;
	//#endregion

	export let component: typeof Span | typeof Label = Label;
	//#endregion

	//#region implementation
	//#endregion
</script>

<svelte:component
	this={component}
	bind:dom
	{id}
	class="mdc-floating-label {className}"
	{style}
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
</svelte:component>
