<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region  imports
	import { parseClassList } from "../../../common/functions";
	import type { GraphicType } from "../../../common/components";
	import { Icon } from "../../../icon-button/src/internal";
	import type { IconDOM } from "..";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/snackbar/Icon:${count++}`;
	export let dom: IconDOM = undefined;
	//#endregion

	export let type: GraphicType = "icon";
	//#endregion
</script>

<Icon
	bind:dom
	{...$$restProps}
	{id}
	class={parseClassList([
		className,
		"mdc-icon-button__icon",
		[type === "icon" && className == undefined, "material-icons"],
	])}
	{style}
	{type}
>
	<slot />
</Icon>
