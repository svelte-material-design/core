<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLInputElement = undefined;
	//#endregion

	export let checked: boolean = false;
	export let value: string = undefined;
	export let disabled: boolean = false;
	export let readonly: boolean = false;

	export let inputId: string = id ? `${id}-input` : undefined;
	//#endregion

	//#region implementation
	function isInputDisabled(_readonly = readonly, _disabled = disabled) {
		return readonly || disabled;
	}
	//#endregion
</script>

<input
	bind:this={dom}
	id={inputId}
	class={classList([className, "mdc-switch__native-control"])}
	{style}
	{checked}
	type="checkbox"
	role="switch"
	aria-checked={checked ? "true" : "false"}
	disabled={isInputDisabled(readonly, disabled)}
	{value}
	{...$$restProps}
	on:change
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
