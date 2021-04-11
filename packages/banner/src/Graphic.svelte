<svelte:options immutable={true} />

<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "../../common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLDivElement = null;

	import type { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Graphic
	export let alt: string = "";
</script>

<div
	bind:this={dom}
	{...props}
	{id}
	class="mdc-banner__graphic {className}"
	{style}
	role="img"
	{alt}
	use:forwardDOMEvents
>
	<slot />
</div>
