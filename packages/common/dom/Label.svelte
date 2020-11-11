<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "../actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLLabelElement = null;

	import { BaseProps } from "./Props";
	export let props: BaseProps = {};
	//#endregion

	// Label
	import { getLabelBehaviour } from "./LabelContext";

	const behaviour = getLabelBehaviour();
</script>

<label
	bind:this={dom}
	{...props}
	{id}
	class="{className}
    {behaviour === 'tab' ? 'mdc-tab__text-label' : ''}"
	{style}
	for={props.for}
	use:forwardDOMEvents>
	<slot />
</label>
