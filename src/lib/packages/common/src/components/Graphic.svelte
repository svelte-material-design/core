<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import type { GraphicDOM, GraphicType } from "./types";
	import { Svg, I, Img } from "../../dom";
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

	//#region implementation
	let component: typeof Svg | typeof I | typeof Img;
	$: switch (type) {
		case "svg":
			component = Svg;
			break;
		case "icon":
			component = I;
			break;
		case "img":
			component = Img;
			break;
	}
	//#endregion
</script>

<svelte:component
	this={component}
	bind:dom
	{id}
	class={classList([
		className,
		[type === "icon" && className == undefined, "material-icons"],
	])}
	{style}
	{...$$restProps}
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focusin
	on:focusout
	on:focus
	on:blur
>
	<slot />
</svelte:component>
