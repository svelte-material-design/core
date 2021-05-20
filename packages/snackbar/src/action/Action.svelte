<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { Button } from "../../../button/src/internal";
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLButtonElement = undefined;
	//#endregion

	//#region button
	export let ripple: boolean = false;
	//#endregion
	//#endregion

	//#region implementation
	//#endregion
</script>

<Button
	bind:dom
	{...$$restProps}
	{id}
	class={classList([className, "mdc-snackbar__action"])}
	{style}
	{ripple}
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
</Button>
