<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { classList } from "@raythurnevoid/strings-filter";
	import { Selectable } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { setCreateMDCLinearProgressInstance } from "../../linear-progress";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let value: string = undefined;
	export let selected: boolean = undefined;
	//#endregion

	//#region implementation
	setCreateMDCLinearProgressInstance(false);
	//#endregion
</script>

<Selectable bind:selected bind:value>
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
	>
		<slot />
	</tr>
</Selectable>
