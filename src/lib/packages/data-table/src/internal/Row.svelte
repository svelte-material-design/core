<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { classList } from "@raythurnevoid/strings-filter";
	import { GroupItem } from "@raythurnevoid/svelte-group-components";
	import { getDataTableContext, setRowContext } from "../DataTableContext";
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
	const context$ = setRowContext({
		selected,
		value,
	});
	$: $context$ = { ...$context$, selected, value };

	const dataTableContext$ = getDataTableContext();
	//#endregion
</script>

<GroupItem group={$dataTableContext$.group} {dom}>
	<tr
		bind:this={dom}
		{id}
		class={classList([
			className,
			"mdc-data-table__row",
			[selected, "mdc-data-table__row--selected"],
		])}
		{style}
		aria-selected={selected ? "true" : "false"}
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
	</tr>
</GroupItem>
