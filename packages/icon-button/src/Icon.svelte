<script lang="ts">
	//#region  imports
	import { GraphicType } from "../../common/components";
	import { parseClassList } from "../../common/functions";
	import { getIconButtonToggleContext, IconDOM } from ".";
	import { Icon } from "./internal";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: IconDOM = undefined;
	//#endregion

	export let type: GraphicType = "icon";
	//#endregion

	//#region implementation
	const iconButtonToggleContext$ = getIconButtonToggleContext();
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
		[
			iconButtonToggleContext$ && $iconButtonToggleContext$.active,
			'mdc-icon-button__icon--on',
		],
	])}
	{style}
	{type}>
	<slot />
</Icon>
