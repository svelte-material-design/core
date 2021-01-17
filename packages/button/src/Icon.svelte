<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { parseClassList } from "../../common/functions";
	import { Graphic, GraphicDOM, GraphicType } from "../../common/components";
	//#endregion

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

	//#region implementation
	//#endregion
</script>

<Graphic
	bind:dom
	{id}
	class={parseClassList([
		className,
		"mdc-button__icon",
		[type === "icon" && className == undefined, "material-icons"],
	])}
	{style}
	{type}
	aria-hidden
	{...$$restProps}
>
	<slot />
</Graphic>
