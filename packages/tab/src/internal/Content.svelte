<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { parseClassList } from "../../../common/functions";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLSpanElement = undefined;
	//#endregion
	//#endregion
</script>

<span
	bind:this={dom}
	{...$$restProps}
	{id}
	class={parseClassList([className, "mdc-tab__content"])}
	{style}
>
	<slot />
</span>
