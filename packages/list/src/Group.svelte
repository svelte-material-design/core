<script lang="ts">
	// Base
	import { DOMEventsForwarder } from "../../../packages/common/events";
	const forwardDOMEvents = DOMEventsForwarder();
	export let dom: HTMLSpanElement = null;
	let className = "";
	export { className as class };
	export let style: string = "";

	export let props: any = {};

	// Graphic
	import { Div } from "../../../packages/common/dom";
</script>

<Div
	{...props}
	bind:dom
	class="mdc-list-group {className}"
	{style}
	on:domEvent={forwardDOMEvents}>
	<slot />
</Div>
