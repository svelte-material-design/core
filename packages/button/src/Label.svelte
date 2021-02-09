<svelte:options immutable={true} />

<script lang="ts">
	import { parseClassList } from "../../common/functions";

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLSpanElement = undefined;
	//#endregion
</script>

<span
	bind:this={dom}
	{...$$restProps}
	{id}
	class={parseClassList([className, "mdc-button__label"])}
	{style}
	{...$$restProps}
>
	<slot />
</span>
