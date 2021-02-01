<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLLIElement = undefined;
	//#endregion

	//#endregion
</script>

<li
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
	on:focus
	on:blur
>
	<slot />
</li>
