<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region imports
	import { LinearProgress } from "./internal";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/linear-progress/IndeterminateLinearProgress:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let reversed: boolean = false;
	export let closed: boolean = false;
	//#endregion

	//#region implementation
	//#endregion
</script>

<svelte:component
	this={LinearProgress}
	bind:dom
	{id}
	class={className}
	{style}
	indeterminate={true}
	{reversed}
	{closed}
	{...$$restProps}
/>
