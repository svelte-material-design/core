<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import type { GraphicDOM, GraphicType } from "../../../common/components";
	import { Graphic } from "../../../common/components";
	import { classList } from "@raythurnevoid/strings-filter";
	import { UseTextFieldIcon } from ".";
	import { getContentContext } from "../TextFieldContext";
	import { onDestroy } from "svelte";
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
	const contentContext$ = getContentContext();

	$contentContext$.setHasLeadingIcon(true);

	onDestroy(() => {
		$contentContext$.setHasLeadingIcon(false);
	});
	//#endregion
</script>

<UseTextFieldIcon {dom} />

<Graphic
	bind:dom
	{id}
	class={classList([
		className,
		"mdc-text-field__icon",
		"smui-input-field-icon",
		"mdc-text-field__icon--leading",
		[type === "icon" && className == undefined, "material-icons"],
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
