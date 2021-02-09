<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import type { IconType, IconDOM } from ".";
	import { parseClassList } from "../../common/functions";
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
	class={parseClassList([
		className,
		[type === "icon" && className == undefined, "material-icons"],
	])}
	{style}
	{type}
	{...$$restProps}
>
	<slot />
</Icon>
