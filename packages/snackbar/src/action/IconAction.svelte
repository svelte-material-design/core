<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { classList } from "@raythurnevoid/strings-filter";
	import { IconButton } from "../../../icon-button";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/snackbar/IconAction:${count++}`;
	export let dom: HTMLButtonElement = undefined;
	//#endregion

	//#region icon-button
	export let ripple: boolean = false;
	//#endregion
	//#endregion

	//#region implementation
	//#endregion
</script>

<IconButton
	bind:dom
	{...$$restProps}
	{id}
	class={classList([className, "mdc-snackbar__action"])}
	{style}
	{ripple}
	type="button"
>
	<slot />
</IconButton>
