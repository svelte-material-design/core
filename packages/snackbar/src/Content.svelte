<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region Base
	import { classList } from "@raythurnevoid/strings-filter";
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/snackbar/Content:${count++}`;

	export let dom: HTMLSpanElement = undefined;
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
