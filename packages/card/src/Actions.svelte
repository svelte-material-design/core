<script lang="ts">
	//#region Base
	import { parseClassList } from "../../common/functions";
	import { DOMEventsForwarder } from "../../common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Actions
	import { setIconButtonBehaviour } from "../../icon-button";
	import { setButtonBehaviour } from "../../button";

	export let fullBleed: boolean = false;

	setButtonBehaviour("card:action");
	setIconButtonBehaviour("card:action");
</script>

<svelte:options immutable={true} />

<div
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([
		className,
		'mdc-card__actions',
		[fullBleed, 'mdc-card__actions--full-bleed'],
	])}
	{style}
	use:forwardDOMEvents>
	<slot />
</div>
