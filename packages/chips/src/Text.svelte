<svelte:options immutable={true} />

<script lang="ts">
	// Base
	import { DOMEventsForwarder } from "../../common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLSpanElement = undefined;
	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};

	// Icon
	import { getSelectableContext } from "../../common/hoc";

	const selectableContext$ = getSelectableContext();
</script>

<span
	bind:this={dom}
	{...props}
	{id}
	class={className}
	{style}
	role="gridcell"
	use:forwardDOMEvents
>
	<span
		role="button"
		tabindex={$selectableContext$.tabindex}
		class="mdc-chip__primary-action"
		aria-checked={$selectableContext$.selected}
	>
		<span class="mdc-chip__text"><slot /></span>
	</span>
</span>
