<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { MDCFloatingLabel } from "@material/floating-label";
	import { onMount, onDestroy } from "svelte";
	import { Span, Label } from "../../common/dom";
	import { FloatingLabel } from "./dom";
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
	let floatingLabel: MDCFloatingLabel;
	onMount(() => {
		floatingLabel = new MDCFloatingLabel(dom);
	});

	onDestroy(() => {
		floatingLabel && floatingLabel.destroy();
	});
	//#endregion
</script>

<FloatingLabel
	bind:dom
	{id}
	class={className}
	{style}
	{component}
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
</FloatingLabel>
