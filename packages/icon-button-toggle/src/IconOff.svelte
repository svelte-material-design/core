<script lang="ts">
	//#region  imports
	import type { IconType, IconDOM } from ".";
	import { parseClassList } from "../../common/functions";
	import { Icon } from "../../icon-button/src";
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
</script>

<svelte:options immutable={true} />

<Icon
	bind:dom
	{...$$restProps}
	{id}
	class={parseClassList([
		className,
		[type === 'icon' && className == undefined, 'material-icons'],
	])}
	{style}
	{type}>
	<slot />
</Icon>
