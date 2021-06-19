<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { Slider } from "./internal";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/slider/ContinuousSlider:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let disabled: boolean = false;
	//#endregion

	//#region implementation
	//#endregion
</script>

<Slider
	class={className}
	{style}
	bind:dom
	bind:id
	bind:disabled
	{...$$restProps}
	on:input
	on:change
	><slot />
</Slider>
