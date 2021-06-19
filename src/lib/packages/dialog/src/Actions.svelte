<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { getDialogContext } from "./DialogContext";
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	//#endregion

	//#region implementation
	const dialogContext$ = getDialogContext();
	$: $dialogContext$.setContentId(id);
	//#endregion
</script>

<div
	bind:this={dom}
	{id}
	class={classList([className, "mdc-dialog__actions"])}
	{style}
	{...$$restProps}
>
	<slot />
</div>
