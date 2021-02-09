<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../common/functions";
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/drawer/Content:${count++}`;

	export let dom: HTMLDivElement = undefined;
	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion
</script>

<div
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([className, "mdc-drawer__content"])}
	{style}
>
	<slot />
</div>
