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
</script>

<div
	bind:this={dom}
	{...props}
	{id}
	class="smui-paper__content {className}"
	{style}
	use:forwardDOMEvents
>
	<slot />
</div>
