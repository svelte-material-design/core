<script lang="ts">
	// Base
	import { DOMEventsForwarder } from "../../../packages/common/events";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = "";

	export let dom: HTMLSpanElement = null;
	export let props: any = {};

	// Graphic
	import { Span } from "../../../packages/common/dom";
</script>

<Span
	{...props}
	bind:dom
	class="mdc-list-item__meta {className}"
	{style}
	on:domEvent={forwardDOMEvents}>
	<slot />
</Span>
