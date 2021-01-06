<script lang="ts">
	import type { GraphicDOM, GraphicType } from "./types";
	import { parseClassList } from "../functions";

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: GraphicDOM = undefined;
	//#endregion

	export let type: GraphicType = "icon";
	//#endregion
</script>

<svelte:options immutable={true} />

{#if type === 'svg'}
	<svg
		bind:this={dom}
		{...$$restProps}
		{id}
		class={className}
		{style}
		xmlns="http://www.w3.org/2000/svg">
		<slot />
	</svg>
{:else if type === 'icon'}
	<i
		bind:this={dom}
		{...$$restProps}
		{id}
		class={parseClassList([
			[className === undefined, 'material-icons'],
			className,
		])}
		{style}>
		<slot />
	</i>
{:else if type === 'img'}
	<img
		bind:this={dom}
		{...$$restProps}
		alt={$$restProps.alt}
		{id}
		class={className}
		{style} />
{/if}
