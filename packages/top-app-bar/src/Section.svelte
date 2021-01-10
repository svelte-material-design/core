<script lang="ts">
	//#region  imports
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

	export let align = "start";
	//#endregion

	//#region implementation
	//#endregion
</script>

<svelte:options immutable={true} />

<section
	bind:this={dom}
	{id}
	class={parseClassList([
		className,
		'mdc-top-app-bar__section',
		[align === 'start', 'mdc-top-app-bar__section--align-start'],
		[align === 'end', 'mdc-top-app-bar__section--align-end'],
	])}
	{style}
	{...$$restProps}>
	<slot />
</section>
