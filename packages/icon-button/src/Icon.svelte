<script lang="ts">
	//#region  imports
	import { Graphic } from "../../common/components";
	import { parseClassList } from "../../common/functions";
	import type { IconDOM, IconType } from ".";
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
	//#endregion
</script>

<svelte:options immutable={true} />

<Graphic
	bind:dom
	{...$$restProps}
	{id}
	class={parseClassList([
		className,
		'mdc-icon-button__icon',
		[type === 'icon' && className == undefined, 'material-icons'],
	])}
	{style}
	{type}>
	<slot />
</Graphic>
