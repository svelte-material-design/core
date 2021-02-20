<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;

	export interface OnListActionEvent {
		targetIndex: number;
		listSelectedIndex: number | number[];
	}
</script>

<script lang="ts">
	//#region  imports
	import { Ol, Ul } from "../../../common/dom";
	import type { ListOrientation, ListItemsStyle } from "..";
	import { parseClassList } from "../../../common/functions";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/list/List:${count++}`;
	export let dom: HTMLDivElement | HTMLUListElement = undefined;
	//#endregion

	export let orientation: ListOrientation = "vertical";
	export let itemsStyle: ListItemsStyle = "textual";
	export let itemsRows: number = 1;
	$: if (itemsRows > 3) {
		itemsRows = 3;
	} else if (itemsRows < 1) {
		itemsRows = 1;
	}

	export let dense: boolean = false;
	export let density: number = 0;
	$: if (itemsRows === 1) {
		if (density > 0) density = 0;
		else if (density < -4) density = -4;
	} else {
		density = 0;
	}

	export let component: typeof Ul | typeof Ol = Ul;
	//#endregion

	//#region implementation
	//#endregion
</script>

<svelte:component
	this={component}
	bind:dom
	{id}
	class={parseClassList([
		className,
		"mdc-list",
		[dense, "mdc-list--dense"],
		[itemsRows === 2, "mdc-list--two-line"],
		[itemsRows === 3, "smui-list--three-line"],
		[orientation === "horizontal", "smui-list--horizontal"],
		[itemsStyle === "textual", "mdc-list--textual-list"],
		[itemsStyle === "avatar", "mdc-list--avatar-list"],
		[itemsStyle === "icon", "mdc-list--icon-list"],
		[itemsStyle === "image", "mdc-list--image-list"],
		[itemsStyle === "thumbnail", "mdc-list--thumbnail-list"],
		[itemsStyle === "video", "mdc-list--video-list"],
	])}
	{style}
	aria-orientation={orientation}
	{...$$restProps}
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focusin
	on:focusout
>
	<slot />
</svelte:component>
