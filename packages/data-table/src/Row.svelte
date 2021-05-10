<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { Selectable } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type { OnSelectableChangeEvent } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { createEventDispatcher, tick } from "svelte";
	import { getDataTableContext, setRowContext } from "./DataTableContext";
	import type { OnRowChange } from "./types";
	import { Row } from "./internal";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLTableRowElement = undefined;
	//#endregion

	export let value: string = undefined;
	export let selected: boolean = undefined;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		change: OnRowChange;
	}>();

	const dataTableContext$ = getDataTableContext();

	async function handleChange(event: CustomEvent<OnSelectableChangeEvent>) {
		if (selected !== event.detail.selected) {
			selected = event.detail.selected;
			await tick();
		}
		dispatch("change", { dom, selected });
	}
	//#endregion
</script>

<Selectable
	bind:selected
	group={$dataTableContext$.selectionGroup}
	{dom}
	{value}
	on:change={handleChange}
>
	<Row
		bind:dom
		{id}
		class={className}
		{style}
		{value}
		{selected}
		{...$$restProps}
		on:click
		on:mousedown
		on:mouseup
		on:keydown
		on:keyup
		on:focus
		on:blur
		on:focusin
		on:focusout
	>
		<slot />
	</Row>
</Selectable>
