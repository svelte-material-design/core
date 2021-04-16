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
	export let id: string = `@smui/image-list/Supporting:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import type { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Supporting
</script>

<div
	bind:this={dom}
	{...props}
	{id}
	class={classList([className, "mdc-image-list__supporting"])}
	{style}
	use:forwardDOMEvents
>
	<slot />
</div>
