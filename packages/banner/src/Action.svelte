<svelte:options immutable={true} />

<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "../../common/events";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLButtonElement | HTMLAnchorElement = null;

	import type { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Action
	import { Button, ButtonColor } from "../../button";

	export let ripple: boolean = true;
	export let type: ButtonColor = "primary";
</script>

<Button
	bind:dom
	{props}
	{id}
	class="{className || ''} {type === 'primary'
		? 'mdc-banner__primary-action'
		: 'mdc-banner__secondary-action'}"
	{style}
	{ripple}
	on:domEvent={forwardDOMEvents}
>
	<slot />
</Button>
