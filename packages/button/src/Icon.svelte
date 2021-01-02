<script lang="ts">
	import { parseClassList } from "../../common/functions";
	import { Graphic, GraphicDOM, GraphicType } from "../../common/components";

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: GraphicDOM = undefined;
	//#endregion

	export let type: GraphicType = "icon";
	//#endregion

	$: props = {
		...props,
		"aria-hidden": true,
	};
</script>

<svelte:options immutable={true} />

<Graphic
	bind:dom
	{...$$restProps}
	{id}
	class={parseClassList([
		className,
		'mdc-button__icon',
		[type === 'icon' && className == undefined, 'material-icons'],
	])}
	{style}
	{type}>
	<slot />
</Graphic>
