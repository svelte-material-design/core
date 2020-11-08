<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../packages/common/functions";
	import { DOMEventsForwarder } from "../../../packages/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/image-list/Item:${count++}`;

	export let dom: HTMLLIElement = undefined;

	import { BaseProps } from "../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Item
</script>

<svelte:options immutable={true} />

<li
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([className, 'mdc-image-list__item'])}
	{style}
	use:forwardDOMEvents>
	<slot />
</li>
