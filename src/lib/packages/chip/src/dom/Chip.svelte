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
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let accessibleTouch: boolean = false;
	//#endregion

	//#region implementation
	//#endregion
</script>

<div
	bind:this={dom}
	class="svmd-chip__wrapper"
	class:mdc-touch-target-wrapper={accessibleTouch}
>
	<div
		{id}
		class={classList([
			className,
			"mdc-evolution-chip",
			[selected, "mdc-evolution-chip--selected"],
			[accessibleTouch, "mdc-evolution-chip--touch"],
		])}
		{style}
		role="row"
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
		{#if ripple}
			<div class="mdc-evolution-chip__ripple" />
		{/if}
		<slot />
	</div>
</div>

<style>
	.svmd-chip__wrapper {
		display: inline;
	}
</style>
