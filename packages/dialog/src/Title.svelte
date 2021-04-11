<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../common/functions";
	import { DOMEventsForwarder } from "../../common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `../../dialog/Title:${count++}`;

	export let dom: HTMLDivElement = undefined;
	import type { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Title
	import { getDialogContext } from "./DialogContext";

	const dialogContext$ = getDialogContext();

	$: $dialogContext$.setTitleId(id);
</script>

<h2
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([className, "mdc-dialog__title"])}
	{style}
	use:forwardDOMEvents
>
	<slot />
</h2>
