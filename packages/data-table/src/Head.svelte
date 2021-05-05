<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { setRowBehaviour } from "./RowContext";
	//#endregion

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
	setRowBehaviour("header");
	//#endregion
</script>

<thead bind:this={dom} {id} class={className} {style} {...$$restProps}>
	<slot />
</thead>
