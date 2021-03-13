<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import type { IconDOM, IconType } from "../item/types";
	import { Icon } from "../../../list/src/item";
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
</script>

<Icon
	bind:dom
	{id}
	class={classList([
		className,
		"mdc-menu__selection-group-icon",
		[type === "icon" && className == undefined, "material-icons"],
	])}
	{style}
	{type}
>
	<slot />
</Icon>
