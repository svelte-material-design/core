<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
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
	export let id: string = `@svmd/linear-progress/LinearProgress:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let reversed: boolean = false;
	export let closed: boolean = false;
	export let progress: number = 0;
	export let buffer: number = 1;
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
	indeterminate={false}
	{reversed}
	{closed}
	{progress}
	{buffer}
	aria-valuemin="0"
	aria-valuemax="1"
	aria-valuenow={progress}
	{...$$restProps}
/>
