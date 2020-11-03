<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../packages/common/functions";
	import { DOMEventsForwarder } from "../../../packages/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `../../../packages/dialog/Content:${count++}`;

	export let dom: HTMLDivElement = undefined;
	import { BaseProps } from "../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Content
	import { getDialogContext } from "./DialogContext";

	const dialogContext$ = getDialogContext();

	$: $dialogContext$.setContentId(id);
</script>

<div
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([className, 'mdc-dialog__content'])}
	{style}
	use:forwardDOMEvents>
	<slot />
</div>
