<script lang="ts">
	// Base
	import { DOMEventsForwarder } from "../../../packages/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = "";

	export let dom: HTMLLIElement = null;
	import { BaseProps } from "../../../packages/common/dom/Props";
	export let props: BaseProps = {};

	// Selection group
	import { setIsSelectionGroup } from "../../../packages/list";

	setIsSelectionGroup(true);
</script>

<li {...props} class={className} {style} bind:this={dom} use:forwardDOMEvents>
	<ul class="mdc-menu__selection-group">
		<slot />
	</ul>
</li>
