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
	let position: "leading" | "trailing" = className.includes(
		"mdc-list-item__meta"
	)
		? "trailing"
		: "leading";

	let materialIcon =
		className === "mdc-list-item__meta" ||
		className === "mdc-list-item__graphic";
	//#endregion
</script>

<Graphic
	bind:dom
	{id}
	class={classList([
		className,
		[type === "icon" && materialIcon, "material-icons"],
		[position === "trailing", "smui-list__trailing-icon"],
	])}
	{style}
	{type}
	{...$$restProps}
>
	<slot />
</Graphic>
