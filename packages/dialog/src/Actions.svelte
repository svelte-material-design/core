<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "../../common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `../../dialog/Actions:${count++}`;

	export let dom: HTMLDivElement = undefined;
	import type { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Actions
</script>

<footer
	bind:this={dom}
	{...props}
	{id}
	class="mdc-dialog__actions {className}"
	{style}
	use:forwardDOMEvents
>
	<slot />
</footer>
