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
	export let action: boolean = false;
	//#endregion

	//#region implementation
	//#endregion
</script>

<Graphic
	bind:dom
	{id}
	class={classList([
		className,
		"mdc-chip__icon",
		"mdc-chip__icon--trailing",
		[type === "icon" && className == undefined, "material-icons"],
		[action, "mdc-chip-trailing-action"],
	])}
	{style}
	{type}
	role={action ? "button" : undefined}
	{...$$restProps}
>
	<slot />
</Graphic>
