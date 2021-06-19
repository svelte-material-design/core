<svelte:options immutable={true} />

<script lang="ts">
	import { classList } from "@raythurnevoid/strings-filter";

	//#region imports
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLSpanElement = undefined;
	//#endregion

	//#endregion

	//#region implementation
	//#endregion
</script>

<span
	bind:this={dom}
	{...$$restProps}
	{id}
	class={classList([className, "mdc-snackbar__label"])}
	{style}
	aria-atomic="false"
>
	<slot />
</span>
