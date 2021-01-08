<script lang="ts">
	//#region  imports
	import type { IconDOM, IconType } from ".";
	import { Icon } from "../../../icon-button/src";
	import { Icon as ButtonIcon } from "../../../button/src";
	import { getActionType } from "./ActionsContext";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: IconDOM = undefined;
	//#endregion

	export let type: IconType = "icon";
	//#endregion

	//#region implementation
	const parent = getActionType();
	//#endregion
</script>

<svelte:options immutable={true} />

<svelte:component
	this={parent === 'icon' ? Icon : ButtonIcon}
	bind:dom
	{...$$restProps}
	{id}
	class={className}
	{style}
	{type}>
	<slot />
</svelte:component>
