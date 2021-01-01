<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/snackbar/Content:${count++}`;

	export let dom: HTMLSpanElement = undefined;
	//#endregion
</script>

<svelte:options immutable={true} />

<span
	bind:this={dom}
	{...$$restProps}
	{id}
	class={parseClassList([className, 'mdc-snackbar__label'])}
	{style}
	aria-atomic="false">
	<slot />
</span>
