<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { parseClassList } from "../../../common/functions";
	import { IconButton, IconButtonColor } from "../../../icon-button";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/snackbar/Dismiss:${count++}`;
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
	class={parseClassList([
		className,
		"mdc-snackbar__dismiss",
		[className == undefined, "material-icons"],
	])}
	{style}
	{ripple}
	type="button"
>
	close
</IconButton>
