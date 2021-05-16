<svelte:options immutable={true} />

<script lang="ts" context="module">
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
	export let id: string = `@svmd/dialog/Title:${count++}`;
	export let dom: HTMLHeadingElement = undefined;
	//#endregion

	//#endregion

	//#region implementation
	const dialogContext$ = getDialogContext();
	$: $dialogContext$.setTitleId(id);
	//#endregion
</script>

<h2
	bind:this={dom}
	{id}
	class={classList([className, "mdc-dialog__title"])}
	{style}
	{...$$restProps}
>
	<slot />
</h2>
