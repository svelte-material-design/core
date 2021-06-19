<svelte:options immutable={true} />

<script lang="ts">
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

<footer bind:this={dom} {id} class={className} {style} {...$$restProps}>
	<slot />
</footer>
