<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/PrimaryText:${count++}`;

	export let dom: HTMLSpanElement = undefined;
	import { BaseProps } from "../../common/dom/Props";
	import { parseClassList } from "../../common/functions";
	export let props: BaseProps = {};
	//#endregion

	// PrimaryText
</script>

<svelte:options immutable={true} />

<span
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([className, 'mdc-list-item__primary-text'])}
	{style}>
	<slot />
</span>
