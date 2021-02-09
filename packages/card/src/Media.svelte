<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { parseClassList } from "../../common/functions";
	import type { AspectRatio } from ".";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let aspectRatio: AspectRatio = "square";
	//#endregion

	//#region implementation
	//#endregion
</script>

<div
	bind:this={dom}
	{id}
	class={parseClassList([
		className,
		"mdc-card__media",
		[aspectRatio === "square", "mdc-card__media--square"],
		[aspectRatio === "16x9", "mdc-card__media--16-9"],
	])}
	{style}
	{...$$restProps}
>
	<slot />
</div>
