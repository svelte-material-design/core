<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/Separator:${count++}`;

	export let dom: HTMLLIElement | HTMLHRElement = undefined;
	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Separator
	import { getListContext } from "./ListContext";
	import { parseClassList } from "../../common/functions";

	export let insetPadding: boolean = false;
	export let insetLeading: boolean = false;
	export let insetTrailing: boolean = false;

	const listContext$ = getListContext();
</script>

<svelte:options immutable={true} />

{#if $listContext$.isNav}
	<hr
		bind:this={dom}
		{...props}
		{id}
		class={parseClassList([
			className,
			'mdc-list-divider',
			[insetPadding, 'mdc-list-divider--inset-padding'],
			[insetLeading, 'mdc-list-divider--inset-leading'],
			[insetTrailing, 'mdc-list-divider--inset-trailing'],
		])}
		{style} />
{:else}
	<li
		bind:this={dom}
		{...props}
		{id}
		class={parseClassList([
			className,
			'mdc-list-divider',
			[insetPadding, 'mdc-list-divider--inset-padding'],
			[insetLeading, 'mdc-list-divider--inset-leading'],
			[insetTrailing, 'mdc-list-divider--inset-trailing'],
		])}
		{style}
		role="separator" />
{/if}
