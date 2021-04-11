<svelte:options immutable={true} />

<script lang="ts">
	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLOptionElement = undefined;
	//#endregion

	export let value: string;
	//#endregion

	//#region implementation
	//#endregion
</script>

<option bind:this={dom} {id} class={className} {style} {value} {...$$restProps}>
	<slot />
</option>
