<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../packages/common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/drawer/Subtitle:${count++}`;

	export let dom: HTMLHeadingElement = undefined;
	import { BaseProps } from "../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion
</script>

<svelte:options immutable={true} />

<h1
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([className, 'mdc-drawer__subtitle'])}
	{style}>
	<slot />
</h1>
