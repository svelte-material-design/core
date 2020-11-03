<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../packages/common/functions";
	import { DOMEventsForwarder } from "../../../packages/common/events";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `../../../packages/data-table/LinearProgress:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// LinearProgress
	import {
		LinearProgress,
		setCreateMDCLinearProgressInstance,
	} from "../../../packages/linear-progress";

	export let ariaLabel: string = undefined;

	setCreateMDCLinearProgressInstance(false);
</script>

<LinearProgress
	bind:dom
	{props}
	{id}
	class={parseClassList([className, 'mdc-data-table__linear-progress'])}
	{style}
	indeterminate
	{ariaLabel}
	on:domEvent={forwardDOMEvents} />
