<script lang="ts">
	//#region imports
	import { parseClassList } from "../../../common/functions";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLSpanElement = undefined;
	//#endregion
	//#endregion
</script>

<svelte:options immutable={true} />

<span
	bind:this={dom}
	{...$$restProps}
	{id}
	class={parseClassList([className, 'mdc-tab__text-label'])}
	{style}>
	<slot />
</span>
