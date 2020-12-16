<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLLIElement | HTMLHRElement = undefined;
	import { BaseProps } from "../../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Separator
	import { parseClassList } from "../../../../common/functions";

	export let insetPadding: boolean = false;
	export let insetLeading: boolean = false;
	export let insetTrailing: boolean = false;

	export let isNav: boolean = false;

	$: classList = parseClassList([
		className,
		"mdc-list-divider",
		[insetPadding, "mdc-list-divider--inset-padding"],
		[insetLeading, "mdc-list-divider--inset-leading"],
		[insetTrailing, "mdc-list-divider--inset-trailing"],
	]);
</script>

<svelte:options immutable={true} />

{#if isNav}
	<hr bind:this={dom} {...props} {id} class={classList} {style} />
{:else}
	<li
		bind:this={dom}
		{...props}
		{id}
		class={classList}
		{style}
		role="separator" />
{/if}
