<script lang="ts">
	import { parseClassList } from "../../common/functions";

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLSpanElement = undefined;
	//#endregion
</script>

<svelte:options immutable={true} />

<span
	bind:this={dom}
	{...$$restProps}
	{id}
	class={parseClassList([className, 'mdc-button__label'])}
	{style}
	{...$$restProps}>
	<slot />
</span>
