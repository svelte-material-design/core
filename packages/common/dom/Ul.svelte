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
	export let dom: HTMLUListElement = null;
	//#endregion

	//#endregion

	//#region implementation
	//#endregion
</script>

<ul
	bind:this={dom}
	{id}
	class={className}
	{style}
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
</ul>
