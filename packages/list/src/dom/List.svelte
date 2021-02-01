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
	import type { ListOrientation, ListType } from "..";
	import { parseClassList } from "../../../common/functions";
	import type { ListImplRole } from "../internal";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/list/List:${count++}`;
	export let dom: HTMLDivElement | HTMLUListElement = undefined;
	//#endregion

	export let role: ListImplRole = "list";
	export let orientation: ListOrientation = "vertical";
	export let type: ListType = "textual";
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
		[type === "textual", "mdc-list--textual-list"],
		[type === "avatar", "mdc-list--avatar-list"],
		[type === "icon", "mdc-list--icon-list"],
		[type === "image", "mdc-list--image-list"],
		[type === "thumbnail", "mdc-list--thumbnail-list"],
		[type === "video", "mdc-list--video-list"],
	])}
	{style}
	{role}
	aria-orientation={orientation}
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focusin
	on:focusout
	on:focus
	on:blur
	{...$$restProps}
>
	<slot />
</svelte:component>
