<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { getSelectContext } from "../";
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/select/HelperText:${count++}`;
	export let dom: HTMLParagraphElement = undefined;
	//#endregion

	export let validationMsg: boolean = false;
	export let persistent: boolean = false;
	//#endregion

	//#region implementation
	const selectContext$ = getSelectContext();
	$: $selectContext$?.setHelperTextId(id);
	//#endregion
</script>

<p
	bind:this={dom}
	{id}
	class={classList([
		className,
		"mdc-select-helper-text",
		[persistent, "mdc-select-helper-text--validation-msg-persistent"],
		[validationMsg, "mdc-select-helper-text--validation-msg"],
	])}
	{style}
	aria-hidden="true"
	{...$$restProps}
>
	<slot />
</p>
