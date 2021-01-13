<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import type { CardVariant } from ".";
	import { parseClassList } from "../../common/functions";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/card/Card:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let variant: CardVariant = "raised";
	//#endregion

	//#region implementation
	//#endregion
</script>

<svelte:options immutable={true} />

<div
	bind:this={dom}
	{id}
	class={parseClassList([
		className,
		'mdc-card',
		[variant === 'outlined', 'mdc-card--outlined'],
	])}
	{style}
	{...$$restProps}>
	<slot />
</div>
