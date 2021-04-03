<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import type { GraphicDOM, GraphicType } from "../../../common/components";
	import { Graphic } from "../../../common/components";
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: GraphicDOM = undefined;
	//#endregion

	export let type: GraphicType = "icon";
	//#endregion
</script>

<Graphic
	bind:dom
	{id}
	class={classList([
		className,
		"mdc-select__icon",
		[type === "icon", "material-icons"],
	])}
	{style}
	{type}
	{...$$restProps}
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur
>
	<slot />
</Graphic>
