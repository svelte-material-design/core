<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { classList } from "@raythurnevoid/strings-filter";
	import type { GraphicType } from "../../../common/components";
	import { Icon } from "../../../icon-button/src";
	import type { IconDOM } from "..";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: IconDOM = undefined;
	//#endregion

	export let type: GraphicType = "icon";
	//#endregion
</script>

<Icon
	bind:dom
	{...$$restProps}
	{id}
	class={classList([
		className,
		"mdc-icon-button__icon",
		[type === "icon" && className == undefined, "material-icons"],
	])}
	{style}
	{type}
>
	<slot />
</Icon>
