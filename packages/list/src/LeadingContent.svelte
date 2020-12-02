<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../packages/common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/LeadingContent:${count++}`;

	export let dom: HTMLSpanElement = undefined;

	import { BaseProps } from "../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// LeadingContent
</script>

<svelte:options immutable={true} />

<span
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([className, 'mdc-list-item__graphic'])}
	{style}>
	<slot />
</span>
