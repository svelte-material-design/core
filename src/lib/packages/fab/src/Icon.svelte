<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { Graphic } from "../../common/components";
	import { classList } from "@raythurnevoid/strings-filter";
	import type { IconDOM, IconType } from ".";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: IconDOM = undefined;
	//#endregion

	export let type: IconType = "icon";
	//#endregion

	//#region implementation
	//#endregion
</script>

<Graphic
	bind:dom
	{...$$restProps}
	{id}
	class={classList([
		className,
		"mdc-fab__icon",
		[type === "icon" && className == undefined, "material-icons"],
	])}
	{style}
	{type}
>
	<slot />
</Graphic>
