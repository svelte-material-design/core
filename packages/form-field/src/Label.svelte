<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "../../../packages/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLLabelElement = undefined;

	import { BaseProps } from "../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Label
	import { getFormFieldContext } from "./";

	const formFieldContext$ = getFormFieldContext();
</script>

<style>
	span {
		display: block;
	}
</style>

<svelte:options immutable={true} />

<label
	bind:this={dom}
	{...props}
	{id}
	class={className}
	{style}
	for={$formFieldContext$.inputId}
	use:forwardDOMEvents>
	<slot />
</label>
