<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { BaseProps } from "../../common/dom/Props";

	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/linear-progress/IndeterminateLinearProgress:${count++}`;
	export let dom: HTMLDivElement = undefined;
	export let props: BaseProps = undefined;
	//#endregion

	// LinearProgress
	import LinearProgressImpl from "./LinearProgressImpl.svelte";

	export let indeterminate: boolean = false;
	export let reversed: boolean = false;
	export let closed: boolean = false;
	export let ariaLabel: string = undefined;
</script>

<svelte:options immutable={true} />

<svelte:component
	this={LinearProgressImpl}
	bind:dom
	{props}
	{id}
	class={className}
	{style}
	indeterminate={true}
	{reversed}
	{closed}
	{ariaLabel} />
