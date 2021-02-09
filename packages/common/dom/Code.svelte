<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "../src/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLDivElement = undefined;

	import type { BaseProps } from "./Props";
	export let props: BaseProps = {};
	//#endregion

	// Pre
</script>

<code
	bind:this={dom}
	{...props}
	{id}
	class={className}
	{style}
	use:forwardDOMEvents
>
	<slot />
</code>
