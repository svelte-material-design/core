<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
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

	export let align = "start";
	//#endregion

	//#region implementation
	//#endregion
</script>

<section
	bind:this={dom}
	{id}
	class={classList([
		className,
		"mdc-top-app-bar__section",
		[align === "start", "mdc-top-app-bar__section--align-start"],
		[align === "end", "mdc-top-app-bar__section--align-end"],
	])}
	{style}
	{...$$restProps}
>
	<slot />
</section>
