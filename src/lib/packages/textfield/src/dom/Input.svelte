<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { classList } from "@raythurnevoid/strings-filter";
	import type { TextArea, Input } from "../../../common/dom";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLInputElement | HTMLTextAreaElement = undefined;
	//#endregion

	export let component: typeof TextArea | typeof Input;
	//#endregion

	//#region implementation
	//#endregion
</script>

<svelte:component
	this={component}
	bind:dom
	{id}
	class={classList([className, "mdc-text-field__input"])}
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
/>
