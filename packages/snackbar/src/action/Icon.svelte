<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import type { GraphicType } from "../../../common/components";
	import { Icon } from "../../../icon-button/src";
	import { Icon as ButtonIcon } from "../../../button/src";
	import type { IconDOM } from "..";
	import { getActionType } from "./ActionsContext";
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

	//#region implementation
	const parent = getActionType();
	//#endregion
</script>

<svelte:component
	this={parent === "icon" ? Icon : ButtonIcon}
	bind:dom
	{id}
	class={className}
	{style}
	{type}
	{...$$restProps}
>
	<slot />
</svelte:component>
