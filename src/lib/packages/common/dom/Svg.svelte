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
	export let dom: SVGElement = null;
	//#endregion

	//#endregion

	//#region implementation
	//#endregion
</script>

<svg
	bind:this={dom}
	{id}
	class={className}
	{style}
	xmlns="http://www.w3.org/2000/svg"
	{...$$restProps}
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focusin
	on:focusout
	on:focus
	on:blur
>
	<slot />
</svg>
