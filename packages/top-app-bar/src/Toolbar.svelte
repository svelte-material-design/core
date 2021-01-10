<script lang="ts">
	//#region  imports
	import { Section } from ".";
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

<Section
	bind:dom
	{id}
	class={className}
	{style}
	{...$$restProps}
	align="end"
	role="toolbar">
	<slot />
</Section>
