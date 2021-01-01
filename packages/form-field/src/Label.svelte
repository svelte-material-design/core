<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "../../common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLLabelElement = undefined;

	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Label
	import { getFormFieldContext } from "./";
	import { onDestroy } from "svelte";

	const formFieldContext$ = getFormFieldContext();

	$: if (!id) id = `${$formFieldContext$.id}--label`;
	$: $formFieldContext$.setLabelId(id);

	onDestroy(() => {
		$formFieldContext$.setLabelId(undefined);
	});
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
