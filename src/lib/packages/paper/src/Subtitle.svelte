<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "../../common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLHeadingElement = null;

	import type { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion
</script>

<h6
	bind:this={dom}
	{...props}
	{id}
	class="smui-paper__subtitle {className}"
	{style}
	use:forwardDOMEvents
>
	<slot />
</h6>
