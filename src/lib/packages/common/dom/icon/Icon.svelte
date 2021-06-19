<svelte:options immutable={true} />

<script lang="ts">
	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLSpanElement = undefined;
	//#endregion

	//#endregion

	//#region implementation
	//#endregion
</script>

<i
	bind:this={dom}
	{id}
	class={className || "material-icons"}
	{style}
	{...$$restProps}
>
	<slot />
</i>
