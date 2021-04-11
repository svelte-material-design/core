<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLButtonElement = undefined;
	//#endregion
	//#endregion

	//#region implementation
	//#endregion
</script>

<button
	bind:this={dom}
	{...$$restProps}
	{id}
	class={className}
	{style}
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur
	on:focusin
	on:focusout
>
	<slot />
</button>
