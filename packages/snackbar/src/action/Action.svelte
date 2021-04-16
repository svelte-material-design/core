<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { Button, ButtonColor } from "../../../button";
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/snackbar/Action:${count++}`;
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
	type="button"
>
	<slot />
</Button>
