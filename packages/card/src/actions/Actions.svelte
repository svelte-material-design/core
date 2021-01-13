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
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let fullBleed: boolean = false;
	//#endregion

	//#region implementation
	//#endregion
</script>

<svelte:options immutable={true} />

<div
	bind:this={dom}
	{id}
	class={parseClassList([
		className,
		'mdc-card__actions',
		[fullBleed, 'mdc-card__actions--full-bleed'],
	])}
	{style}
	{...$$restProps}>
	<slot />
</div>
