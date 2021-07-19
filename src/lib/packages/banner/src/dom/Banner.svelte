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

	export let stackedOnMobile: boolean = true;
	export let fixed: boolean = false;
	export let centered: boolean = false;
	//#endregion

	//#region implementation
	//#endregion
</script>

<div
	bind:this={dom}
	{id}
	class={classList([
		className,
		"mdc-banner",
		[stackedOnMobile, "mdc-banner--mobile-stacked"],
		[centered, "mdc-banner--centered"],
	])}
	{style}
	role="banner"
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
	{#if fixed}
		<div class="mdc-banner__fixed">
			<div class="mdc-banner__content" role="alertdialog" aria-live="assertive">
				<slot />
			</div>
		</div>
	{:else}
		<div class="mdc-banner__content" role="alertdialog" aria-live="assertive">
			<slot />
		</div>
	{/if}
</div>
