<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import type { IconDOM, IconType } from "./types";
	import { Graphic } from "../../../common/components";
	import { classList } from "@raythurnevoid/strings-filter";
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
	{id}
	class={classList([
		className,
		"mdc-list-item__meta",
		"smui-list__trailing-icon",
		[type === "icon" && !className, "material-icons"],
	])}
	{style}
	{type}
	{...$$restProps}
>
	<slot />
</Graphic>
