<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/ListGroupSeparator:${count++}`;

	export let dom: HTMLHRElement = undefined;
	import { BaseProps } from "../../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Separator
	import { parseClassList } from "../../../../packages/common/functions";

	export let insetPadding: boolean = false;
	export let insetLeading: boolean = false;
	export let insetTrailing: boolean = false;
</script>

<svelte:options immutable={true} />

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
