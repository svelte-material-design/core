<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { classList } from "@raythurnevoid/strings-filter";
	import type { GraphicDOM } from "../../../common/components";
	import { Graphic } from "../../../common/components";
	import type { GraphicType } from "../../../common/components";
	import { onMount } from "svelte";
	import { getButtonContext } from "../ButtonContext";
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
	const buttonContext$ = getButtonContext();

	onMount(() => {
		$buttonContext$.setHasLeadingIcon(true);

		return () => {
			$buttonContext$.setHasLeadingIcon(false);
		};
	});
	//#endregion
</script>

<Graphic
	bind:dom
	{id}
	class={classList([
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
