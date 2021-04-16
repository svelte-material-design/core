<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { classList } from "@raythurnevoid/strings-filter";
	import { DOMEventsForwarder } from "../../common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `../../data-table/HeaderCell:${count++}`;

	export let dom: HTMLTableHeaderCellElement = undefined;

	import type { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Label
	import { getRowBehaviour } from "./RowContext";

	const behaviour = getRowBehaviour();
</script>

{#if behaviour == "header"}
	<div
		bind:this={dom}
		{...props}
		{id}
		class={classList([className, "mdc-data-table__header-cell-label"])}
		{style}
		use:forwardDOMEvents
	>
		<slot />
	</div>
{:else}
	<slot />
{/if}
