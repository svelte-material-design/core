<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { parseClassList } from "../../../common/functions";
	//#endregion

	//#region exports
	//#base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/snackbar/Actions:${count++}`;

	export let dom: HTMLSpanElement = undefined;
	//#endregion
	//#endregion

	//#region implementation
	//#endregion
</script>

<div
	bind:this={dom}
	{...$$restProps}
	{id}
	class={parseClassList([className, "mdc-snackbar__actions"])}
	{style}
	aria-atomic="true"
>
	<slot />
</div>
