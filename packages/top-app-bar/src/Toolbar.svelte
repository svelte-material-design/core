<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { Section } from ".";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion
	//#endregion

	//#region implementation
	//#endregion
</script>

<Section
	bind:dom
	{id}
	class={className}
	{style}
	align="end"
	role="toolbar"
	{...$$restProps}
>
	<slot />
</Section>
