<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { classList } from "@raythurnevoid/strings-filter";
	import { DOMEventsForwarder } from "../../common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/image-list/Item:${count++}`;

	export let dom: HTMLLIElement = undefined;

	import type { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Item
</script>

<li
	bind:this={dom}
	{...props}
	{id}
	class={classList([className, "mdc-image-list__item"])}
	{style}
	use:forwardDOMEvents
>
	<slot />
</li>
