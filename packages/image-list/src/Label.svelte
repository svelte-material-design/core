<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../common/functions";
	import { DOMEventsForwarder } from "../../common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/image-list/Label:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import type { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Label
</script>

<span
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([className, "mdc-image-list__label"])}
	{style}
	use:forwardDOMEvents
>
	<slot />
</span>
