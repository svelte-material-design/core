<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { classList } from "@raythurnevoid/strings-filter";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { onDestroy, onMount, tick } from "svelte";
	import { LinearProgress } from "../../linear-progress/src/internal";
	import { getDataTableContext } from "./DataTableContext";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let closed: boolean = false;
	//#endregion

	//#region implementation
	const dataTableContext$ = getDataTableContext();

	onMount(async () => {
		await tick();
		$dataTableContext$.reinitialize();
		handleClosedUpdate();
	});

	onDestroy(async () => {
		await tick();
		$dataTableContext$.reinitialize();
	});

	async function handleClosedUpdate() {
		$dataTableContext$.showProgress(!closed);
	}
	//#endregion
</script>

<UseState value={closed} onUpdate={handleClosedUpdate} />

<div
	bind:this={dom}
	{id}
	class={classList([className, "mdc-data-table__progress-indicator"])}
	{style}
>
	<div class="mdc-data-table__scrim" />
	<LinearProgress
		class="mdc-data-table__linear-progress"
		indeterminate
		disableMDCInstance
		{...$$restProps}
	/>
</div>
