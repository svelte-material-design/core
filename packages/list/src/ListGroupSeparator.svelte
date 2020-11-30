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
	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Separator
	import { parseClassList } from "../../common/functions";

	export let padded: boolean = false;
	export let inset: boolean = false;
</script>

<hr
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([
		className,
		'mdc-list-divider',
		[padded, 'mdc-list-divider--padded'],
		[inset, 'mdc-list-divider--inset'],
	])}
	{style} />
