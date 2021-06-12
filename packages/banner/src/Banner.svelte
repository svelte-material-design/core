<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { BannerStyles } from ".";
	import { Banner } from "./internal";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/banner/Banner:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let stackedOnMobile: boolean = false;
	export let fixed: boolean = false;
	export let centered: boolean = false;
	export let open: boolean = false;
	//#endregion

	//#region implementation
	//#endregion
</script>

<Banner
	bind:dom
	{id}
	class={className}
	bind:open
	{style}
	{stackedOnMobile}
	{fixed}
	{centered}
	{...$$restProps}
	on:opening
	on:opened
	on:closing
	on:closed
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
</Banner>

<BannerStyles />
