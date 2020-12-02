<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../../packages/common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/LeadingContent:${count++}`;

	export let dom: HTMLImageElement = undefined;

	import { BaseProps } from "../../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// LeadingImage
	export let alt: string;
	export let src: string = undefined;
	export let srcset: string = undefined;
	export let loading: "eager" | "lazy" = undefined;
</script>

<svelte:options immutable={true} />

<img
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([className, 'mdc-list-item__graphic'])}
	{style}
	{alt}
	{src}
	{srcset}
	{loading} />
