<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import type { IconType, IconDOM } from ".";
	import { classList } from "@raythurnevoid/strings-filter";
	import { Icon } from "../../icon-button/src";
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

<Icon
	bind:dom
	{id}
	class={classList([
		className,
		[type === "icon" && className == undefined, "material-icons"],
		"mdc-icon-button__icon--on",
	])}
	{style}
	{type}
	{...$$restProps}
>
	<slot />
</Icon>
