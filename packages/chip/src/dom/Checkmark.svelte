<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { classList } from "@raythurnevoid/strings-filter";
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
	//#endregion
</script>

<span
	bind:this={dom}
	{id}
	class={classList(["mdc-chip__checkmark", className])}
	{style}
	on:click
>
	<svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
		{#if !$$slots.default}
			<path
				class="mdc-chip__checkmark-path"
				fill="none"
				stroke="black"
				d="M1.73,12.91 8.1,19.28 22.79,4.59"
			/>
		{:else}
			<slot class="mdc-chip__checkmark-path" />
		{/if}
	</svg>
</span>
