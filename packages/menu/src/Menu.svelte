<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import type { MDCMenuDistance } from "@material/menu-surface";
	import type { ListOrientation, ListItemsStyle } from "../../list";
	import { handleSelect as handleListSelect } from "../../list/src/functions";
	import { Menu } from "./internal";
	import type {
		MenuSelectionType,
		OnMenuChangeEvent,
		OnMenuSelect,
		MenuValue,
		MenuAnchorCorner,
		MenuVariant,
		MenuAnchorMargin,
		MenuAnchor,
	} from "./types";
	import { createEventDispatcher, tick } from "svelte";
	import { SelectionGroup } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/menu/Menu:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	//#region list
	export let orientation: ListOrientation = "vertical";
	export let itemsStyle: ListItemsStyle = "textual";
	export let itemsRows: number = 1;
	export let dense: boolean = false;
	export let wrapFocus: boolean = false;
	export let typeahead: boolean = false;
	//#endregion

	//#region menu surface
	export let open: boolean = false;
	export let quickOpen: boolean = false;
	export let anchorFlipRtl: boolean = true;
	export let anchorCorner: MenuAnchorCorner = "bottom-start";
	export let anchorMargin: MenuAnchorMargin = undefined;
	export let variant: MenuVariant = undefined;
	export let hoisted: boolean = false;
	export let nullable: boolean = true;
	//#endregion

	export let value: MenuValue = undefined;
	export let group: SelectionGroupBinding = undefined;
	export let selectionType: MenuSelectionType = undefined;
	export let anchor: MenuAnchor;
	//#endregion

	//#region implementation
	let selectionGroup: SelectionGroup;

	const dispatch = createEventDispatcher<{
		change: OnMenuChangeEvent;
		select: OnMenuSelect;
	}>();

	async function handleSelect({ itemIndex }: OnMenuSelect) {
		if (selectionType) {
			handleListSelect({
				selectionType,
				selectionGroup,
				itemIndex,
			});

			await tick();

			dispatch("change", {
				dom,
				value,
			});
		}
	}
	//#endregion
</script>

<SelectionGroup
	bind:this={selectionGroup}
	bind:value
	{selectionType}
	{nullable}
	{group}
	let:group
>
	<Menu
		bind:dom
		bind:open
		bind:value
		{id}
		class={className}
		{style}
		{quickOpen}
		{anchor}
		{anchorCorner}
		{anchorFlipRtl}
		{anchorMargin}
		{variant}
		{hoisted}
		{wrapFocus}
		{typeahead}
		{orientation}
		{itemsStyle}
		{itemsRows}
		{dense}
		{selectionType}
		{group}
		{...$$restProps}
		on:select={(e) => handleSelect(e.detail)}
		on:select
		on:open
		on:close
		on:closing
		on:click
		on:mousedown
		on:mouseup
		on:keydown
		on:keyup
		on:focus
		on:blur
		on:focusin
		on:focusout
		on:optionsChange
	>
		<slot />
	</Menu>
</SelectionGroup>
