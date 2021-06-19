<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

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
	export let id: string = `@svmd/dialog/Content:${count++}`;
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
	class={classList([className, "mdc-dialog__content"])}
	{style}
	{...$$restProps}
>
	<slot />
</div>
