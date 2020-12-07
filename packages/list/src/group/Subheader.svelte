<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/SubHeader:${count++}`;

	export let dom: HTMLDivElement = undefined;
	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// SubHeader
</script>

<svelte:options immutable={true} />

<h3
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([className, 'mdc-list-group__subheader'])}
	{style}>
	<slot />
</h3>
