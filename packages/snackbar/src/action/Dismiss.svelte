<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { classList } from "@raythurnevoid/strings-filter";
	import { IconButton } from "../../../icon-button/src/internal";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLButtonElement = undefined;
	//#endregion

	//#region icon-button
	export let ripple: boolean = false;
	//#endregion
</script>

<IconButton
	bind:dom
	{...$$restProps}
	{id}
	class={classList([
		className,
		"mdc-snackbar__dismiss",
		[className == undefined, "material-icons"],
	])}
	{style}
	{ripple}
	type="button"
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
	close
</IconButton>
