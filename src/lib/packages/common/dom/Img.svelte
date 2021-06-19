<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLImageElement = null;
	//#endregion

	export let alt: string;
	//#endregion

	//#region implementation
	//#endregion
</script>

<img
	bind:this={dom}
	{id}
	class={className}
	{style}
	{alt}
	{...$$restProps}
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur
/>
