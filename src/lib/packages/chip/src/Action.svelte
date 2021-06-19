<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { Action } from "./dom";
	import { getChipContext } from "./ChipContext";
	//#endregion

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
	const chipContext$ = getChipContext();
	//#endregion
</script>

<Action
	bind:dom
	{id}
	class={className}
	{style}
	aria-checked={$chipContext$.selected}
	{...$$restProps}
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
</Action>
