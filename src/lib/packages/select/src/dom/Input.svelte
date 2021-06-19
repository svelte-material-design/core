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
	export let dom: HTMLInputElement = undefined;
	//#endregion

	//#endregion

	//#region implementation
	//#endregion
</script>

<input
	bind:this={dom}
	{id}
	class={className}
	{style}
	{...$$restProps}
	type="hidden"
/>
