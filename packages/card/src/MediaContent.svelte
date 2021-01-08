<script lang="ts">
	//#region imports
	import { parseClassList } from "../../common/functions";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion
	//#endregion

	//#region implementation
	//#endregion
</script>

<svelte:options immutable={true} />

<div
	bind:this={dom}
	{...$$restProps}
	{id}
	class={parseClassList([className, 'mdc-card__media-content'])}
	{style}>
	<slot />
</div>
