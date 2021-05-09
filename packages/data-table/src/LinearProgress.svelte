<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { classList } from "@raythurnevoid/strings-filter";
	import { LinearProgress } from "../../linear-progress/src/internal";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let ariaLabel: string = undefined;
	//#endregion

	//#region implementation
	//#endregion
</script>

<LinearProgress
	bind:dom
	{id}
	class={classList([className, "mdc-data-table__linear-progress"])}
	{style}
	{ariaLabel}
	indeterminate
	disableMDCInstance
	{...$$restProps}
/>
