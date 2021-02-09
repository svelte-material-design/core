<svelte:options immutable={true} />

<script lang="ts">
	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLAnchorElement = undefined;
	//#endregion

	export let href: string = undefined;
	//#endregion
</script>

<a
	bind:this={dom}
	{id}
	class={className}
	{style}
	{href}
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
</a>
